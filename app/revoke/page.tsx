import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, reason } = body;

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // 1. Почистване и форматиране на телефонния номер (E.164)
    const cleanedPhone = phone.replace(/\D/g, '');
    const phoneE164 = cleanedPhone.length === 10 ? `+1${cleanedPhone}` : `+${cleanedPhone}`;

    if (cleanedPhone.length < 10) {
      return NextResponse.json(
        { error: 'Invalid US phone number format' },
        { status: 400 }
      );
    }

    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    // 2. Добавяне в локалната DNC таблица (Fail-Closed списък)
    await sql`
      INSERT INTO dnc_suppression_list (phone_e164, reason, ip_address, user_agent, revoked_at)
      VALUES (${phoneE164}, ${reason || 'User Revoked Consent'}, ${clientIp}, ${userAgent}, NOW())
      ON CONFLICT (phone_e164) 
      DO UPDATE SET revoked_at = NOW(), reason = EXCLUDED.reason;
    `;

    // 3. Актуализиране на статуса в Supabase TCPA Audit Logs
    const { error: dbError } = await supabaseAdmin
      .from('tcpa_audit_logs')
      .update({ 
        status: 'CONSENT_REVOKED',
        quarantine_reason: reason || 'Opt-Out Request via Revoke API' 
      })
      .eq('phone_number', phone);

    if (dbError) {
      console.error('[Revoke API] Supabase update notice:', dbError);
    }

    return NextResponse.json({
      success: true,
      message: 'Consent successfully revoked and phone number added to DNC suppression list.',
      phone: phoneE164,
    });

  } catch (err: any) {
    console.error('[Revoke API] Error:', err.message);
    return NextResponse.json(
      { error: 'Internal server error while processing revocation' },
      { status: 500 }
    );
  }
}
