import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | USARoofDamageCheck',
  description: 'Privacy Policy and state data protection rights disclosure.',
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold mb-2 text-slate-900">Privacy Policy</h1>
      <p className="text-xs text-slate-500 mb-8">Last Updated: September 18, 2026</p>

      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 text-slate-900">1. Information We Collect</h2>
        <p>
          We collect personal identification details you voluntarily provide (Name, Phone Number, Email, Property Address, ZIP Code, Storm Damage Details) and technical metadata (IP address, browser type, geographic location, device IDs).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 text-slate-900">2. CIPA Disclosure & Session Recording Technologies</h2>
        <p>
          We utilize third-party compliance, anti-fraud, and session verification tools—specifically <strong>ActiveProspect TrustedForm</strong> and <strong>Verisk Jornaya LeadID</strong>. These technologies capture website interaction data, DOM elements, mouse movements, keystrokes, and form inputs solely to document consent verification, combat fraudulent automated submissions, and ensure legal compliance.
        </p>
        <p className="mt-2 font-semibold text-slate-900">
          Recording and tracking scripts initialize only after affirmative user interaction or consent modal acknowledgment.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 text-slate-900">3. Sharing of Information</h2>
        <p>
          We sell, match, and share lead inquiry data with independent roofing contractors, home improvement networks, and qualified buyer partners (e.g., MarketCall) solely to fulfill your service inquiry and facilitate matching contractor communications as described in our TCPA terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 text-slate-900">4. State Privacy Rights (CCPA/CPRA, TDPSA, VCDPA)</h2>
        <p>
          Residents of California, Texas, Virginia, and other compliant states have specific rights:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><strong>Right to Know & Access:</strong> Request details regarding data collected.</li>
          <li><strong>Right to Delete:</strong> Request complete removal of your personal data from our systems.</li>
          <li><strong>Opt-Out of Data Sale:</strong> Email <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">dnc@usaroofdamagecheck.com</code> with "Do Not Sell My Information" in the subject line.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2 text-slate-900">5. Data Retention</h2>
        <p>
          Consent metadata, TrustedForm certificates, and cryptographic hashes are securely retained for a minimum of four (4) years to comply with statutory legal limitations for consumer telemarketing regulations.
        </p>
      </section>
    </main>
  );
}