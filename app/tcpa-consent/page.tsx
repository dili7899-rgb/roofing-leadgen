export default function TcpaConsentPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-slate-800 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">TCPA & State Consent Terms</h1>
          <p className="text-xs text-slate-500 mt-1">Effective September 3, 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            1. Express Written Consent Disclosure
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            By submitting your information on any form on this website or calling a tracked telephone number, you provide your prior express written consent to be contacted by USARoofDamageCheck and its network of partners via automated telephone dialing systems, artificial/pre-recorded voices, SMS text messages, and emails.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            2. State Mini-TCPA Rules
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            We comply with state-specific calling window limits including Florida FTSA and Oklahoma OTSA (8:00 a.m. – 8:00 p.m. local time, max 3 attempts per 24 hours).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            3. Opt-Out Mechanism
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            You may revoke consent at any time by replying &quot;STOP&quot; to any text message or emailing dnc@usaroofdamagecheck.com with your phone number.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">4. Contact</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            USARoofDamageCheck<br />
            <a href="mailto:dnc@usaroofdamagecheck.com" className="text-blue-600 hover:underline">
              dnc@usaroofdamagecheck.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}