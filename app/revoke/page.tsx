'use client';

import React, { useState } from 'react';

export default function RevokeConsentPage() {
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/revoke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, reason }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to revoke consent.');
      }

      setStatus({
        type: 'success',
        message: 'Your phone number has been added to our DNC suppression list and consent has been revoked.',
      });
      setPhone('');
      setReason('');
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900">Revoke Consent & Do Not Call Portal</h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            USARoofDamageCheck respects your privacy rights under the Telephone Consumer Protection Act (TCPA), California Consumer Privacy Act (CCPA/CPRA), and Texas Data Privacy and Security Act (TDPSA). Use this form to immediately revoke consent and place your phone number on our internal Do Not Call (DNC) suppression list.
          </p>
        </div>

        {/* Form Block */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3 border-slate-100">
            Submit Revocation Request
          </h2>

          {status && (
            <div
              className={`p-4 rounded-xl text-sm border ${
                status.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                placeholder="(555) 555-5555"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-slate-900 text-sm"
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-1">
                Reason for Revocation (Optional)
              </label>
              <select
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-slate-900 text-sm bg-white"
              >
                <option value="">Select a reason...</option>
                <option value="No longer interested in roofing services">No longer interested in roofing services</option>
                <option value="Did not request information / Wrong number">Did not request information / Wrong number</option>
                <option value="Receiving too many communications">Receiving too many communications</option>
                <option value="Exercising CCPA / State Opt-Out Rights">Exercising CCPA / State Opt-Out Rights</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 disabled:opacity-50 text-sm shadow-sm"
            >
              {loading ? 'Processing Request...' : 'Revoke Consent & Add to DNC List'}
            </button>
          </form>

          <p className="text-xs text-slate-500 leading-relaxed">
            Requests submitted through this portal are processed automatically. Your number is added to our internal suppression database and synced with our buyer partners instantly.
          </p>
        </div>

        {/* Legal Disclosures & FAQ Block (Правата разширена част) */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3 border-slate-100">
            Important Information About Your Revocation
          </h2>

          <div className="space-y-4 text-sm leading-relaxed">
            <section className="space-y-1">
              <h3 className="font-semibold text-slate-900">1. Processing Time</h3>
              <p className="text-slate-600">
                Automated opt-outs take effect immediately within our core platform. Please allow up to 24–48 hours for external buyer networks and partner call centers to update their suppression logs.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="font-semibold text-slate-900">2. Scope of Suppression</h3>
              <p className="text-slate-600">
                Revoking consent places your telephone number on our master Do Not Call list, preventing USARoofDamageCheck and matched buyer networks from initiating future telemarketing calls, SMS messages, or automated voice outreach.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="font-semibold text-slate-900">3. Audit & Compliance Records</h3>
              <p className="text-slate-600">
                In compliance with federal and state regulations, historical session logs and cryptographic consent hashes (ActiveProspect TrustedForm / Jornaya LeadID) are retained securely for a period of five (5) years solely for legal proof and audit compliance.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="font-semibold text-slate-900">4. Alternative Contact Methods</h3>
              <p className="text-slate-600">
                You may also request revocation or submit privacy inquiries by contacting our legal compliance department directly at{' '}
                <a href="mailto:privacy@usaroofdamagecheck.com" className="text-blue-600 underline hover:text-blue-800">
                  privacy@usaroofdamagecheck.com
                </a>.
              </p>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}
