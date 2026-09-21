import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-slate-800 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: September 18, 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            1. Information We Collect
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            We collect personal identification details you voluntarily provide (Name, Phone Number, Email, Property Address, ZIP Code, Storm Damage Details) and technical metadata (IP address, browser type, geographic location, device IDs).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            2. CIPA Disclosure & Session Recording Technologies
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            We utilize third-party compliance, anti-fraud, and session verification tools—specifically <strong>ActiveProspect TrustedForm</strong> and <strong>Verisk Jornaya LeadID</strong>. These technologies capture website interaction data, DOM elements, mouse movements, keystrokes, and form inputs solely to document consent verification, combat fraudulent automated submissions, and ensure legal compliance.
          </p>
          <p className="text-sm leading-relaxed text-slate-900 font-semibold bg-slate-50 p-3 rounded-lg border border-slate-200">
            Recording and tracking scripts initialize only after affirmative user interaction or consent modal acknowledgment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            3. Sharing of Information
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            We sell, match, and share lead inquiry data with independent roofing contractors, home improvement networks, and qualified buyer partners (e.g., MarketCall) solely to fulfill your service inquiry and facilitate matching contractor communications as described in our TCPA terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            4. State Privacy Rights (CCPA/CPRA, TDPSA, VCDPA)
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Residents of California, Texas, Virginia, and other compliant states have specific rights:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            <li><strong>Right to Know & Access:</strong> Request details regarding data collected.</li>
            <li><strong>Right to Delete:</strong> Request complete removal of your personal data from our systems.</li>
            <li><strong>Opt-Out of Data Sale:</strong> Email <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">privacy@usaroofdamagecheck.com</code> with "Do Not Sell My Information" in the subject line.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            5. Data Retention
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Consent metadata, TrustedForm certificates, and cryptographic hashes are securely retained for a minimum of four (4) years to comply with statutory legal limitations for consumer telemarketing regulations.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">6. Contact</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            USARoofDamageCheck Privacy Office<br />
            <a href="mailto:privacy@usaroofdamagecheck.com" className="text-blue-600 hover:underline">
              privacy@usaroofdamagecheck.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
