export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-slate-800 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: September 3, 2026</p>
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
              <strong className="text-slate-800">Technical logs:</strong> IP address, browser type and version, device type, operating system, referring URL, pages viewed, timestamps, session duration, and SHA-256 cryptographic hashes of DOM snapshots captured at the moment of form submission or call initiation.
            </li>
            <li>
              <strong className="text-slate-800">Lead data:</strong> Full name, email address, telephone number (including mobile numbers), physical street address, city, state, ZIP code, and any additional information you provide in forms regarding roofing damage, service needs, or insurance claims.
            </li>
            <li>
              <strong className="text-slate-800">Call and interaction data:</strong> Call recordings (where permitted by applicable law), call duration, and metadata associated with tracked telephone numbers.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            2. AdTech & Session Capture – TrustedForm and Jornaya
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            We actively deploy ActiveProspect TrustedForm (Active Certificate / Claim) and Verisk Jornaya LeadiD on all lead-capture pages and call-connect flows. These tools generate an independent, verifiable certificate and session record at the exact moment you submit a form or initiate a tracked call.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            3. State Privacy Rights
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Residents of California (CCPA/CPRA), Florida, Texas (TDPSA), Virginia (VCDPA), Colorado (CPA), and other states with comprehensive privacy laws have rights to access, correct, delete, or opt-out of the sharing of personal information. Email privacy@usaroofdamagecheck.com to exercise these rights.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">4. Contact</h2>
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