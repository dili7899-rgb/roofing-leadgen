import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TCPA & State Communications Consent | USARoofDamageCheck',
  description: 'TCPA, Texas SB 140, and state communication rules disclosure.',
};

export default function TCPAConsentTerms() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold mb-2 text-slate-900">TCPA & State Communications Consent Disclosure</h1>
      <p className="text-xs text-slate-500 mb-8">Last Updated: September 18, 2026</p>

      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 text-slate-900">1. Prior Express Written Consent (PEWC)</h2>
        <p>
          By checking the non-prechecked consent box on our web submission forms and submitting your contact information, you provide your explicit prior express written consent authorizing <strong>USARoofDamageCheck</strong> and up to four (4) matching local licensed roofing / storm restoration contractors (and their marketing agents) to contact you. Contact methods may include marketing telemarketing calls, artificial or prerecorded voice messages, automated text messages (SMS/MMS), and emails to the telephone number and email address provided.
        </p>
        <p className="mt-2">
          You acknowledge that consent is requested using automated dialing systems (ATDS) or artificial technology. <strong>Consent is completely voluntary and is not a condition of purchasing any good, property, or service.</strong>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 text-slate-900">2. State Mini-TCPA Operational Limits</h2>
        <p>
          USARoofDamageCheck strictly enforces operational compliance safeguards aligned with state telemarketing statutes (including Texas SB 140, Florida FTSA, and Oklahoma OTSA):
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Calling Windows:</strong> Outbound communications occur strictly between 08:00 AM and 08:00 PM local time based on your provided ZIP code.</li>
          <li><strong>Attempt Limits:</strong> Communications will not exceed three (3) automated contact attempts within any rolling 24-hour period.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 text-slate-900">3. Instant Revocation of Consent & Opt-Out Portal</h2>
        <p>
          You have the absolute right to revoke consent at any time through any reasonable method:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Reply <strong>STOP</strong>, <strong>END</strong>, <strong>CANCEL</strong>, <strong>UNSUBSCRIBE</strong>, or <strong>QUIT</strong> to any automated SMS.</li>
          <li>Submit an immediate online suppression request via our <Link href="/revoke" className="text-blue-600 underline font-semibold">Revocation Portal (/revoke)</Link>.</li>
          <li>Send an email specifying your phone number to <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">dnc@usaroofdamagecheck.com</code>.</li>
        </ul>
        <p className="mt-2">
          All revocation requests are processed and added to our internal Do-Not-Call suppression database within 24 hours of receipt.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 text-slate-900">4. Immutable Consent Audit Logging</h2>
        <p>
          To maintain legal compliance and prevent fraud, USARoofDamageCheck logs immutable cryptographic proof of consent, including SHA-256 session hashes, DOM interaction snapshots, IP address metadata, and active ActiveProspect TrustedForm / Verisk Jornaya certificates.
        </p>
      </section>
    </main>
  );
}