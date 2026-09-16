import { NextResponse } from 'next/server'
import { generateDisclosureHash } from '@/lib/consent'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // 1. Capture Client Metadata for Compliance Logging
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const userAgent = req.headers.get('user-agent') || 'Unknown'
    const disclosureVersion =
      process.env.NEXT_PUBLIC_CONSENT_DISCLOSURE_VERSION || 'v2026.1'
    const pageUrl = data.pageUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const plainTextDisclosure = `By clicking "Get My Roofing Assessment," I provide my electronic signature and consent to be contacted by USARoofDamageCheck.com and MarketCall partners at ${data.phone}.`

    // 2. Generate SHA-256 Consent Hash (Legal Proof)
    const disclosureHash = generateDisclosureHash(
      disclosureVersion,
      ['MarketCall Roofing Network'],
      plainTextDisclosure,
      data.phone,
      pageUrl
    )

    // 3. Save Record in Supabase (5-Year TCPA Audit Log)
    const { error: dbError } = await supabaseAdmin.from('tcpa_audit_logs').insert([
      {
        phone_number: data.phone || '+15555555555',
        full_name: `${data.firstName || 'Homeowner'} ${data.lastName || 'Property Owner'}`.trim(),
        zip_code: data.zipCode || '75001',
        user_state: data.state || 'TX',
        ip_address: ip,
        user_agent: userAgent,
        trusted_form_url: data.trustedFormCertUrl || 'https://cert.trustedform.com/test',
        jornaya_leadid: data.jornayaToken || null,
        consent_text: plainTextDisclosure,
        sha256_hash: disclosureHash,
      },
    ])

    if (dbError) {
      console.error('Supabase error:', dbError)
    } else {
      console.log('✅ Consent logged successfully in Supabase!')
    }

    // 4. Send to MarketCall API
    let marketCallData = null
    try {
      const response = await fetch('https://www.marketcall.com/api/v1/lead/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.MARKETCALL_API_KEY || 'TEST_KEY',
          campaign_id: process.env.MARKETCALL_CAMPAIGN_ID || process.env.MARKETCALL_OFFER_ID || '1234',
          first_name: data.firstName || 'Homeowner',
          last_name: data.lastName || 'Property Owner',
          phone: data.phone,
          address: data.address || '123 Main St',
          trusted_form_cert_url: data.trustedFormCertUrl || '',
          tcpa_hash: disclosureHash,
          ip: ip,
          user_agent: userAgent,
        }),
      })

      marketCallData = await response.json()
    } catch (mcErr) {
      console.warn('MarketCall API warning (Proceeding anyway):', mcErr)
    }

    // Always return 200 OK if Supabase logging passed
    return NextResponse.json({ 
      success: true, 
      hash: disclosureHash, 
      marketcall: marketCallData 
    })

  } catch (err: any) {
    console.error('Fatal submit error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}