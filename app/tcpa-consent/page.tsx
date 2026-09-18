import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TCPA Consent Disclosure | USARoofDamageCheck',
  description: 'Express written consent disclosures under the Telephone Consumer Protection Act.',
};

export default function TcpaConsentPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-slate-800 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">TCPA Express Written Consent Disclosure</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: September 18, 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            1. Consent to Receive Automated Calls and Texts
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            By submitting your contact information, phone number, and property details on USARoofDamageCheck, you provide <strong>express written consent</strong> under the Telephone Consumer Protection Act (TCPA) and state-level telemarketing regulations for USARoofDamageCheck, its corporate affiliates, and its certified network of licensed home improvement contractors, roofing specialists, and marketing partners to contact you.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            2. Not a Condition of Purchase
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Your consent to receive these marketing communications is <strong>not required</strong> as a condition of purchasing any property, roofing services, goods, or estimates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            3. Revocation and Opt-Out Rights
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            You have the absolute right to revoke your consent at any time. To stop receiving text messages, simply reply <strong>STOP</strong> to any SMS you receive, or visit our <a href="/revoke" className="text-blue-600 underline font-semibold">Do Not Call / Revoke Portal</a>.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">4. Contact Compliance</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            USARoofDamageCheck Compliance Team<br />
            Email: <a href="mailto:compliance@usaroofdamagecheck.com" className="text-blue-600 hover:underline">compliance@usaroofdamagecheck.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}