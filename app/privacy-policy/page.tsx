import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | USARoofDamageCheck',
  description: 'Privacy Policy and state data protection rights disclosure.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-slate-800 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: September 18, 2026</p>
        </div>

        <p className="text-sm leading-relaxed text-slate-600">
          This Privacy Policy describes how USARoofDamageCheck (“Company,” “we,” “us,” or “our”) collects, uses, discloses, and protects information when you visit or interact with our websites, landing pages, forms, call-tracking numbers, and related services (collectively, the “Services”) that connect consumers seeking roofing repair or replacement services with third-party service providers.
        </p>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            1. Data Collection Disclosure
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">We collect the following categories of information:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
            <li>
              <strong className="text-slate-800">Technical & Session Metadata:</strong> IP address, browser type, device details, operating system, referring URL, pages viewed, timestamps, session duration, and SHA-256 cryptographic hashes of DOM snapshots captured at the moment of form submission or call initiation.
            </li>
            <li>
              <strong className="text-slate-800">Lead Identification Data:</strong> Full name, email address, telephone number (including mobile numbers), physical street address, city, state, ZIP code, and property details regarding roofing damage, service needs, or insurance claims.
            </li>
            <li>
              <strong className="text-slate-800">Call Metadata:</strong> Call duration, timestamps, and metadata associated with tracked telephone numbers (and call recordings where permitted by law).
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            2. CIPA Disclosure & AdTech Session Capture (TrustedForm & Jornaya)
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            We utilize third-party compliance, anti-fraud, and session verification tools—specifically <strong>ActiveProspect TrustedForm</strong> and <strong>Verisk Jornaya LeadID</strong>. These technologies capture website interaction data, DOM elements, mouse movements, keystrokes, and form inputs solely to document consent verification, combat fraudulent automated submissions, and ensure legal compliance under applicable electronic surveillance statutes (including CIPA).
          </p>
          <p className="text-sm leading-relaxed font-medium text-slate-800">
            Recording and tracking scripts initialize strictly following user interaction or consent modal acknowledgment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            3. Sharing of Information & Revenue Generation
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            We match, share, and sell lead inquiry data and call connections with independent roofing contractors, home improvement networks, and qualified buyer partners (e.g., MarketCall) solely to fulfill your service inquiry and facilitate matched contractor communications as described in our TCPA terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            4. State Privacy Rights (CCPA/CPRA, TDPSA, VCDPA, CPA)
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Residents of California, Texas, Virginia, Colorado, Florida, and other compliant states have specific legal rights regarding their personal data:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            <li><strong>Right to Know & Access:</strong> Request details regarding data collected and shared.</li>
            <li><strong>Right to Delete:</strong> Request complete removal of your personal data from our active systems.</li>
            <li><strong>Opt-Out of Data Sale:</strong> Email <code className="text-blue-600">privacy@usaroofdamagecheck.com</code> with "Do Not Sell My Information" in the subject line.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            5. Mandatory Data Retention
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Consent metadata, TrustedForm certificates, and cryptographic hashes are securely retained for a minimum of four (4) years to satisfy statutory legal limitations for consumer telemarketing regulations.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">6. Contact</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            USARoofDamageCheck<br />
            <a href="mailto:privacy@usaroofdamagecheck.com" className="text-blue-600 hover:underline">
              privacy@usaroofdamagecheck.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}