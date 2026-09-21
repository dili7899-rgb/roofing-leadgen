import React from 'react';

export default function TcpaConsentPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-slate-800 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">TCPA & State Consent Terms</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: September 18, 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            1. Prior Express Written Consent (PEWC)
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            By checking the non-prechecked consent box on our web submission forms and submitting your contact information, you provide your explicit prior express written consent authorizing <strong>USARoofDamageCheck</strong> and up to four (4) matching local licensed roofing / storm restoration contractors (and their marketing agents) to contact you. Contact methods may include telemarketing calls, artificial or prerecorded voice messages, automated text messages (SMS/MMS), and emails to the telephone number and email address provided.
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            You acknowledge that consent is requested using automated dialing systems (ATDS) or artificial technology. <strong>Consent is completely voluntary and is not a condition of purchasing any good, property, or service.</strong>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            2. State Mini-TCPA Operational Limits
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            USARoofDamageCheck strictly enforces operational compliance safeguards aligned with state telemarketing statutes (including Texas SB 140, Florida FTSA, and Oklahoma OTSA):
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            <li><strong>Calling Windows:</strong> Outbound communications occur strictly between 08:00 AM and 08:00 PM local time based on your provided ZIP code.</li>
            <li><strong>Attempt Limits:</strong> Communications will not exceed three (3) automated contact attempts within any rolling 24-hour period.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            3. Instant Revocation of Consent & Opt-Out Portal
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            You have the absolute right to revoke consent at any time through any reasonable method:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            <li>Reply <strong>STOP</strong>, <strong>END</strong>, <strong>CANCEL</strong>, <strong>UNSUBSCRIBE</strong>, or <strong>QUIT</strong> to any automated SMS.</li>
            <li>Submit an immediate online suppression request via our <a href="/revoke" className="text-blue-600 underline hover:text-blue-800">Revocation Portal (/revoke)</a>.</li>
            <li>Send an email specifying your phone number to <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">dnc@usaroofdamagecheck.com</code>.</li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-600 mt-2">
            All revocation requests are processed and added to our internal Do-Not-Call suppression database within 24 hours of receipt.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            4. Immutable Consent Audit Logging
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            To maintain legal compliance and prevent fraud, USARoofDamageCheck logs immutable cryptographic proof of consent, including SHA-256 session hashes, DOM interaction snapshots, IP address metadata, and active ActiveProspect TrustedForm / Verisk Jornaya certificates.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">5. Contact</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            USARoofDamageCheck Compliance Division<br />
            <a href="mailto:dnc@usaroofdamagecheck.com" className="text-blue-600 hover:underline">
              dnc@usaroofdamagecheck.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
