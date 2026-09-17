import { NextResponse } from 'next/server'
import { generateDisclosureHash } from '@/lib/consent'
import { supabaseAdmin } from '@/lib/supabase'
import { evaluateStateCompliance } from '@/lib/compliance/stateRules'
import { routeLeadWaterfall, RoutingResult } from '@/lib/routing/waterfall'

async function claimTrustedFormCertificate(certUrl: string) {
  const TRUSTEDFORM_API_KEY = process.env.TRUSTEDFORM_API_KEY
  if (!TRUSTEDFORM_API_KEY || !certUrl) {
    return { success: false, reason: 'Missing API Key or Cert URL' }
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
    })

    if (!res.ok) return { success: false, reason: `Retain API HTTP ${res.status}` }
    const data = await res.json()
    return { success: true, retainedUrl: data.retained_url || certUrl, response: data }
  } catch (err: any) {
    return { success: false, reason: err.message }
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // 1. Capture Client Metadata for Compliance Logging
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '127.0.0.1'
    const userAgent = req.headers.get('user-agent') || 'Unknown'
    const disclosureVersion = process.env.NEXT_PUBLIC_CONSENT_DISCLOSURE_VERSION || 'v2026.1'
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

    // 3. Claim TrustedForm Certificate (ActiveProspect Retain)
    const tfResult = await claimTrustedFormCertificate(data.trustedFormCertUrl)
    const retainedCertUrl = tfResult.retainedUrl || data.trustedFormCertUrl || ''

    // 4. Check State Compliance (Mini-TCPA Daytime Hours)
    const compliance = evaluateStateCompliance(data.zipCode || '75001', data.state || 'TX')

    // 5. Execute Cascading Waterfall Lead Router (If compliance passes)
    let routingResult: RoutingResult = {
      success: true,
      buyerName: 'Nighttime Queue',
      payout: 0,
      leadId: 'NIGHT_QUEUE_' + Date.now(),
    }

    if (compliance.canCall) {
      routingResult = await routeLeadWaterfall({
        firstName: data.firstName || 'Homeowner',
        lastName: data.lastName || 'Property Owner',
        phone: data.phone,
        email: data.email || 'lead@example.com',
        zipCode: data.zipCode || '75001',
        trustedFormUrl: retainedCertUrl,
        jornayaLeadId: data.jornayaToken || undefined,
        address: data.address,
      })
    }

    // 6. Save Record in Supabase (5-Year TCPA Audit Log)
    const { error: dbError } = await supabaseAdmin.from('tcpa_audit_logs').insert([
      {
        phone_number: data.phone || '+15555555555',
        full_name: `${data.firstName || 'Homeowner'} ${data.lastName || 'Property Owner'}`.trim(),
        zip_code: data.zipCode || '75001',
        user_state: data.state || 'TX',
        ip_address: ip,
        user_agent: userAgent,
        trusted_form_url: retainedCertUrl,
        jornaya_leadid: data.jornayaToken || null,
        consent_text: plainTextDisclosure,
        sha256_hash: disclosureHash,
        status: compliance.canCall ? (routingResult.payout > 0 ? 'SOLD' : 'QUEUED') : 'QUEUED_NIGHTTIME',
        quarantine_reason: compliance.reason || null,
      },
    ])

    if (dbError) {
      console.error('Supabase error:', dbError)
    }

    return NextResponse.json({ 
      success: true, 
      hash: disclosureHash, 
      status: compliance.canCall ? 'SUBMITTED' : 'QUEUED_NIGHTTIME',
      buyer: routingResult.buyerName,
      payout: routingResult.payout,
      leadId: routingResult.leadId
    })

  } catch (err: any) {
    console.error('Fatal submit error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}