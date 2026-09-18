import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | USARoofDamageCheck',
  description: 'Terms of Service and legal disclosures for USARoofDamageCheck matching platform.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-slate-800 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: September 18, 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            1. Lead Matching & Broker Status Disclaimer
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            <strong>USARoofDamageCheck</strong> operates strictly as an independent marketing, data technology, and lead-matching platform. <strong>USARoofDamageCheck is NOT a licensed roofing contractor, general contractor, insurance adjuster, public adjuster, or building inspector.</strong> We do not perform structural repairs, estimates, or direct contracting services. Any contractor, service provider, or third party with whom you are matched is an independent contractor. We make no guarantees, warranties, or representations regarding the quality, safety, licensure, insurance, or performance of any matched professional.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            2. User Agreement & Authorization
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            By accessing this website, submitting an inquiry, or clicking any button authorizing contact, you represent that you are at least 18 years of age, the legal account holder or authorized user of the telephone number provided, and reside in the United States. You authorize USARoofDamageCheck to pass your service inquiry data to independent third-party service providers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            3. Binding Individual Arbitration & Class Action Waiver
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            <strong>PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.</strong>
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            Any dispute, controversy, or claim arising out of or relating to your use of this site, marketing communications, or services offered by USARoofDamageCheck shall be settled by binding individual arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules. <strong>YOU EXPRESSLY WAIVE YOUR RIGHT TO PARTICIPATE IN OR INITIATE CLASS-ACTION LAWSUITS, CLASS-WIDE ARBITRATIONS, OR PRIVATE ATTORNEY GENERAL ACTIONS.</strong>
          </p>
          <p className="text-sm leading-relaxed text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
            <strong>30-Day Opt-Out Window:</strong> You have the right to opt out of this arbitration agreement by sending written notice of your decision to <code className="text-blue-600 font-semibold">dnc@usaroofdamagecheck.com</code> within 30 days of first submitting your information on this site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            4. Limitation of Liability
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Under no circumstances shall USARoofDamageCheck, its parent companies, or partners be liable for direct, indirect, incidental, consequential, or punitive damages resulting from your interactions with third-party contractors, project delays, property damage, or contractor billing disputes.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">5. Contact</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            USARoofDamageCheck<br />
            <a href="mailto:legal@usaroofdamagecheck.com" className="text-blue-600 hover:underline">
              legal@usaroofdamagecheck.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}