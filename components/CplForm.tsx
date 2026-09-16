'use client';

import React, { useState } from 'react';

interface Props {
  zipCode: string;
}

export default function CplForm({ zipCode }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tfCertInput = document.querySelector('input[name="xxTrustedFormCertUrl"]') as HTMLInputElement;
      const certUrl = tfCertInput ? tfCertInput.value : '';

      const res = await fetch('/api/lead/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address,
          zipCode: zipCode,
          trustedFormCertUrl: certUrl,
        }),
      });

      if (res.ok) {
        setStep(2);
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('A system error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleSubmitLead} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase">First Name</label>
            <input
              type="text"
              required
              value={formData.firstName}
              className="w-full border p-2 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600"
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase">Last Name</label>
            <input
              type="text"
              required
              value={formData.lastName}
              className="w-full border p-2 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600"
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase">Property Address</label>
            <input
              type="text"
              required
              value={formData.address}
              className="w-full border p-2 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600"
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="(555) 000-0000"
              value={formData.phone}
              className="w-full border p-2 rounded-lg text-gray-900 focus:outline-none focus:border-blue-600"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          {/* TrustedForm Consent Text Tag */}
          <p className="text-xs text-gray-500 leading-normal" data-tf-element-role="consent-language">
            By clicking &quot;Request Free Inspection&quot;, I authorize USARoofDamageCheck and its network of licensed 
            roofing partners to deliver marketing calls and SMS text messages regarding home improvement options 
            to the phone number provided above using an automated system. Consent is not a condition of purchase.
          </p>

          {/* TrustedForm Submit Button Tag */}
          <button
            type="submit"
            disabled={loading}
            data-tf-element-role="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? 'Processing...' : 'Request Free Inspection'}
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="text-center py-8">
          <span className="text-4xl">✅</span>
          <h3 className="text-xl font-bold text-gray-900 mt-2">Request Confirmed</h3>
          <p className="text-sm text-gray-600 mt-1">
            An inspector will evaluate property records for ZIP {zipCode} and contact you shortly.
          </p>
        </div>
      )}
    </div>
  );
}