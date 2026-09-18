'use client';

import React, { useState } from 'react';

export default function RevokeConsentPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('all');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Симулация на изпращане към API (тук ще вържеш твоя бекенд/DB)
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-slate-800 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Revoke Consent & Do-Not-Call Request</h1>
          <p className="text-xs text-slate-500 mt-1">Instant Suppression Portal — Updated 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            1. Instant Opt-Out Notice
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            You have the absolute right to revoke communications consent at any time. Submitting this form immediately adds your contact details to our internal Do-Not-Call (DNC) suppression registry and flags our network partners to cease automated SMS, calls, and email marketing within 24 hours.
          </p>
        </section>

        <section className="space-y-4 pt-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            2. Submit Suppression Details
          </h2>

          {status === 'success' ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm leading-relaxed space-y-1">
              <p className="font-bold">✓ Revocation Request Submitted Successfully</p>
              <p className="text-xs text-emerald-700">
                Your telephone number ({phoneNumber}) and email have been placed on our strict Do-Not-Call suppression list. Please allow up to 24 hours for system-wide synchronization.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Telephone Number (Required) *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="(555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address (Optional)
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Suppression Scope
                </label>
                <select
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-white"
                >
                  <option value="all">Revoke All (Phone, SMS, Email)</option>
                  <option value="calls">Stop Phone Calls Only</option>
                  <option value="sms">Stop Text Messages (SMS) Only</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-lg shadow-sm transition disabled:opacity-50"
              >
                {status === 'submitting' ? 'Processing Suppression...' : 'Confirm Revocation'}
              </button>
            </form>
          )}
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 border-slate-100">
            3. Alternative Opt-Out Methods
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            If you prefer not to use this form, you may also opt out immediately by using any of the following standard methods:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            <li>Reply <strong>STOP</strong>, <strong>END</strong>, or <strong>QUIT</strong> to any SMS received from our system.</li>
            <li>Send a direct request with your phone number to <code className="text-blue-600">dnc@usaroofdamagecheck.com</code>.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">4. Compliance Contact</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            USARoofDamageCheck Privacy & DNC Desk<br />
            <a href="mailto:dnc@usaroofdamagecheck.com" className="text-blue-600 hover:underline">
              dnc@usaroofdamagecheck.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}