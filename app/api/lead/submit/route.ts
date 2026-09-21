import { NextResponse } from 'next/server';
import { generateDisclosureHash } from '@/lib/consent';
import { supabaseAdmin } from '@/lib/supabase';
import { evaluateStateCompliance } from '@/lib/compliance/stateRules';
import { routeLeadWaterfall, RoutingResult } from '@/lib/routing/waterfall';
import { sql } from '@/lib/db';
import { enqueueAuditLog } from '@/lib/queue/auditQueue';

// 1. Claim TrustedForm Certificate (ActiveProspect Retain)
async function claimTrustedFormCertificate(certUrl: string) {
  const TRUSTEDFORM_API_KEY = process.env.TRUSTEDFORM_API_KEY;
  if (!TRUSTEDFORM_API_KEY || !certUrl) {
    return { success: false, reason: 'Missing API Key or Cert URL' };
  }

  try {
    const res = await fetch(certUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`X:${TRUSTEDFORM_API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify({
        vendor: 'USARoofDamageCheck',
        reason: 'Roof Replacement Lead Retention',
      }),
    });

    if (!res.ok) return { success: false, reason: `Retain API HTTP ${res.status}` };
    const data = await res.json();
    return { success: true, retainedUrl: data.retained_url || certUrl, response: data };
  } catch (err: any) {
    return { success: false, reason: err.message };
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Capture Client Metadata for Compliance Logging
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const disclosureVersion = process.env.NEXT_PUBLIC_CONSENT_DISCLOSURE_VERSION || 'v2026.1';
    const pageUrl = data.pageUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Format phone to E.164 standard
    const rawPhone = data.phone || '';
    const cleanedPhone = rawPhone.replace(/\D/g, '');
    const phoneE164 = cleanedPhone.length === 10 ? `+1${cleanedPhone}` : `+${cleanedPhone}`;

    if (!cleanedPhone) {
      return NextResponse.json({ error: 'Valid phone number is required' }, { status: 400 });
    }

    // A. Check DNC / Revoke List (Fail-Closed Protection)
    const existingDnc = await sql`
      SELECT id FROM dnc_suppression_list WHERE phone_e164 = ${phoneE164} LIMIT 1
    `;
    if (existingDnc.length > 0) {
      return NextResponse.json(
        { error: 'Phone number is unsubscribed or on the DNC list' },
        { status: 422 }
      );
    }

    const plainTextDisclosure = `By clicking "Get My Roofing Assessment," I provide my electronic signature and consent to be contacted by USARoofDamageCheck.com and MarketCall partners at ${rawPhone}.`;

    // B. Generate SHA-256 Consent Hash (Legal Proof)
    const disclosureHash = generateDisclosureHash(
      disclosureVersion,
      ['MarketCall Roofing Network'],
      plainTextDisclosure,
      rawPhone,
      pageUrl
    );

    // C. Claim TrustedForm Certificate (ActiveProspect Retain)
    const tfResult = await claimTrustedFormCertificate(data.trustedFormCertUrl);
    const retainedCertUrl = tfResult.retainedUrl || data.trustedFormCertUrl || '';

    // D. Check State Compliance (Mini-TCPA Daytime Hours / Texas SB 140)
    const compliance = evaluateStateCompliance(data.zipCode || '75001', data.state || 'TX');

    // E. Execute Cascading Waterfall Lead Router (If compliance passes)
    let routingResult: RoutingResult = {
      success: true,
      buyerName: 'Nighttime Queue',
      payout: 0,
      leadId: 'NIGHT_QUEUE_' + Date.now(),
    };

    if (compliance.canCall) {
      routingResult = await routeLeadWaterfall({
        firstName: data.firstName || 'Homeowner',
        lastName: data.lastName || 'Property Owner',
        phone: rawPhone,
        email: data.email || 'lead@example.com',
        zipCode: data.zipCode || '75001',
        trustedFormUrl: retainedCertUrl,
        jornayaLeadId: data.jornayaToken || undefined,
        address: data.address,
      });
    }

    // F. Save Record in Supabase Admin Client (Primary TCPA Log)
    const leadStatus = compliance.canCall ? (routingResult.payout > 0 ? 'SOLD' : 'QUEUED') : 'QUEUED_NIGHTTIME';
    
    const { error: dbError } = await supabaseAdmin.from('tcpa_audit_logs').insert([
      {
        phone_number: rawPhone,
        full_name: `${data.firstName || 'Homeowner'} ${data.lastName || 'Property Owner'}`.trim(),
        zip_code: data.zipCode || '75001',
        user_state: data.state || 'TX',
        ip_address: ip,
        user_agent: userAgent,
        trusted_form_url: retainedCertUrl,
        jornaya_leadid: data.jornayaToken || null,
        consent_text: plainTextDisclosure,
        sha256_hash: disclosureHash,
        status: leadStatus,
        quarantine_reason: compliance.reason || null,
      },
    ]);

    if (dbError) {
      console.error('[Submit API] Supabase log error:', dbError);
    }

    // G. Async High-Speed Audit Queue Backup (Supavisor Queue)
    const dwellTimeSeconds = Math.floor((Date.now() - (data.startTimeMs || Date.now())) / 1000);
    await enqueueAuditLog({
      sessionHash: disclosureHash,
      phoneE164,
      zipCode: data.zipCode || '75001',
      ipAddress: ip,
      userAgent,
      dwellTimeSeconds,
      trustedFormUrl: retainedCertUrl,
      jornayaLeadId: data.jornayaToken || undefined,
      sellersPresented: ['MarketCall Inc.', 'USARoofDamageCheck Partners'],
      winningBuyer: routingResult.buyerName,
      isCalifornia: data.state === 'CA',
      cipaConsented: !!data.cipaConsented,
    });

    return NextResponse.json({
      success: true,
      hash: disclosureHash,
      status: compliance.canCall ? 'SUBMITTED' : 'QUEUED_NIGHTTIME',
      buyer: routingResult.buyerName,
      payout: routingResult.payout,
      leadId: routingResult.leadId,
    });

  } catch (err: any) {
    console.error('Fatal submit error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
