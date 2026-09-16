export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-slate-800 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: September 3, 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            1. Lead Matching Disclaimer – Critical Notice
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            USARoofDamageCheck is a digital marketing and lead-matching broker only. We are NOT a licensed roofing contractor, general contractor, home-improvement company, or public adjuster in any state. We do not perform, supervise, schedule, or guarantee any physical roofing inspections, repairs, or replacements.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            2. Contractor Independence
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            All roofing contractors matched through the Services are independent third parties. You are solely responsible for verifying contractor licensing, insurance, and reputation before signing agreements.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            3. Limitation of Liability & Binding Arbitration
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Any disputes will be resolved exclusively through binding individual arbitration under the American Arbitration Association rules. Class-action lawsuits are expressly waived.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">4. Contact</h2>
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