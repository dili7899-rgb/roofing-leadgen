import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | USARoofDamageCheck',
  description: 'Terms of Service, binding arbitration agreement, and legal disclosures for USARoofDamageCheck matching platform.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-slate-800 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: September 18, 2026</p>
        </div>

        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            1. Lead Matching & Broker Status Disclaimer
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            <strong>USARoofDamageCheck</strong> operates strictly as an independent marketing, data technology, and lead-matching platform. <strong>USARoofDamageCheck is NOT a licensed roofing contractor, general contractor, insurance adjuster, public adjuster, or building inspector.</strong> We do not perform structural repairs, estimates, or direct contracting services. Any contractor, service provider, or third party with whom you are matched is an independent contractor. We make no guarantees, warranties, or representations regarding the quality, safety, licensure, insurance, or performance of any matched professional.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            2. User Agreement & Authorization
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            By accessing this website, submitting an inquiry, or clicking any button authorizing contact, you represent that you are at least 18 years of age, the legal account holder or authorized user of the telephone number provided, and reside in the United States. You authorize USARoofDamageCheck to pass your service inquiry data to independent third-party service providers and marketing partners.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            3. Communications Consent & TCPA Disclosure
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            By submitting your information, you provide express written consent under the Telephone Consumer Protection Act (TCPA) and applicable state mini-TCPA laws for USARoofDamageCheck and its network of licensed roofing contractors to deliver telemarketing calls, SMS/MMS messages, automated dialing systems, and artificial or prerecorded voice messages to the phone number provided. Consent is not a condition of purchasing any good or service. You may opt out at any time by visiting our <a href="/revoke" className="text-blue-600 underline">Do Not Call / Revoke Portal</a> or by replying STOP to any SMS text message.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            4. Binding Individual Arbitration & Class Action Waiver
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            <strong>PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.</strong>
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            Any dispute, controversy, or claim arising out of or relating to your use of this site, marketing communications, data privacy practices, or services offered by USARoofDamageCheck shall be settled by binding individual arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules. <strong>YOU EXPRESSLY WAIVE YOUR RIGHT TO PARTICIPATE IN OR INITIATE CLASS-ACTION LAWSUITS, CLASS-WIDE ARBITRATIONS, OR PRIVATE ATTORNEY GENERAL ACTIONS.</strong>
          </p>
          <div className="text-sm leading-relaxed text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200 mt-2">
            <strong className="text-slate-900">30-Day Opt-Out Window:</strong> You have the right to opt out of this arbitration agreement by sending written notice of your decision to <code className="text-blue-600 font-semibold">legal@usaroofdamagecheck.com</code> within 30 days of first submitting your information on this site.
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            5. Intellectual Property & Digital Certificates
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            All content, graphics, interactive widgets, branding, and code structures are the exclusive property of USARoofDamageCheck. Data transactions may utilize ActiveProspect TrustedForm and Verisk Jornaya LeadID session tracking technologies to cryptographically verify consent logs for compliance and audit trail records.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            6. Limitation of Liability
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Under no circumstances shall USARoofDamageCheck, its parent companies, officers, directors, employees, or tech partners be liable for direct, indirect, incidental, consequential, special, or punitive damages resulting from your interactions with third-party contractors, project delays, property damage, defective repairs, or contractor billing disputes.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-2 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">7. Legal Inquiries & Contact</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            USARoofDamageCheck Compliance Office<br />
            Attn: Legal & Compliance Department<br />
            Email:{' '}
            <a href="mailto:legal@usaroofdamagecheck.com" className="text-blue-600 hover:underline">
              legal@usaroofdamagecheck.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}