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
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Revoke Consent & Do Not Call</h1>
          <p className="text-sm text-slate-600 mt-2">
            If you wish to opt out of future communications or revoke your TCPA consent, please submit your phone number below.
          </p>
        </div>

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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-slate-900 text-sm"
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-1">
              Reason (Optional)
            </label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-slate-900 text-sm bg-white"
            >
              <option value="">Select a reason...</option>
              <option value="No longer interested">No longer interested</option>
              <option value="Wrong number">Wrong number</option>
              <option value="Too many calls">Too many calls</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl transition duration-200 disabled:opacity-50 text-sm shadow-sm"
          >
            {loading ? 'Processing...' : 'Submit Revocation Request'}
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center leading-relaxed">
          Requests are processed automatically. Your number will be placed on our internal suppression list within minutes.
        </p>
      </div>
    </div>
  );
}
