'use client';

import React, { useState } from 'react';
import { TcpaCheckbox } from './TcpaCheckBox';

export const RoofingForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: 'Single Family',
    issueType: 'Storm Damage',
    roofAge: '10-20 years',
    isOwner: 'Yes',
    address: '',
    zipCode: '75001', // По подразбиране за тестове (напр. Тексас)
    stateCode: 'TX',
    firstName: '',
    lastName: '',
    phone: '',
    tcpaAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmitFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tcpaAccepted) {
      alert('Please accept the TCPA terms to proceed.');
      return;
    }

    setIsSubmitting(true);

    // Улавяне на TrustedForm сертификата от браузъра
    const tfInput = document.querySelector<HTMLInputElement>('input[name="xxTrustedFormCertUrl"]');
    const trustedFormCertUrl = tfInput ? tfInput.value : '';

    try {
      const res = await fetch('/api/lead/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          trustedFormUrl: trustedFormCertUrl, // Съвпада с очакванията на бекенда
          tcpaAcceptedText: `By checking this box, I authorize USA Roof Damage Check and its contractor partners to contact me by telephone, automated text (SMS), or email...`,
        })
      });

      const data = await res.json();
      if (data.success) {
        setStep(6);
      } else {
        alert('Submission failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('A system error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
      {step <= 5 && (
        <div className="mb-6 font-medium">
          <div className="flex justify-between text-xs text-gray-500 mb-2 font-medium">
            <span>Step {step} of 5</span>
            <span>{step * 20}% Completed</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${step * 20}%` }}
            ></div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Are you the owner of this property?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setFormData({ ...formData, isOwner: option });
                  handleNext();
                }}
                className={`p-4 border-2 rounded-xl font-semibold text-lg hover:border-blue-600 hover:bg-blue-50 transition ${
                  formData.isOwner === option ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                }`}
              >
                {option === 'Yes' ? 'Yes, I Own' : 'No, I Rent'}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            What is the main reason for this inspection?
          </h2>
          <div className="flex flex-col gap-3">
            {[
              { id: 'Storm Damage', label: 'Hail / Wind Storm Damage' },
              { id: 'Active Leak', label: 'Active Roof Leak' },
              { id: 'Old Roof Replacement', label: 'Aging Roof (10+ years old)' },
              { id: 'General Inspection', label: 'Routine Inspection & Estimate' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setFormData({ ...formData, issueType: item.id });
                  handleNext();
                }}
                className="p-4 text-left border-2 border-gray-200 rounded-xl font-medium hover:border-blue-600 hover:bg-blue-50 transition text-gray-900"
              >
                {item.label}
              </button>
            ))}
          </div>
          <button onClick={handleBack} className="mt-4 text-sm text-gray-500 underline">← Back</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            How old is your current roof?
          </h2>
          <div className="flex flex-col gap-3">
            {[
              { id: '0-5 years', label: 'Under 5 years' },
              { id: '6-10 years', label: '6 - 10 years' },
              { id: '10-20 years', label: '10 - 20 years (Recommended for replacement)' },
              { id: 'Unknown', label: 'Not sure' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setFormData({ ...formData, roofAge: item.id });
                  handleNext();
                }}
                className="p-4 text-left border-2 border-gray-200 rounded-xl font-medium hover:border-blue-600 hover:bg-blue-50 transition text-gray-900"
              >
                {item.label}
              </button>
            ))}
          </div>
          <button onClick={handleBack} className="mt-4 text-sm text-gray-500 underline">← Back</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Enter your property address & ZIP
          </h2>
          <p className="text-sm text-gray-500 mb-4">This helps us match you with licensed local contractors.</p>
          
          <input
            type="text"
            placeholder="Street Address (e.g., 123 Main St)"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-4 border-2 border-gray-300 rounded-xl mb-3 focus:border-blue-600 focus:outline-none text-gray-900"
          />

          <div className="grid grid-cols-2 gap-3 mb-4">
            <input
              type="text"
              placeholder="ZIP Code (e.g., 75001)"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              className="p-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none text-gray-900"
            />
            <input
              type="text"
              placeholder="State (e.g., TX)"
              value={formData.stateCode}
              onChange={(e) => setFormData({ ...formData, stateCode: e.target.value.toUpperCase() })}
              className="p-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none text-gray-900"
            />
          </div>

          <button
            disabled={!formData.address || !formData.zipCode}
            onClick={handleNext}
            className="w-full bg-blue-600 text-white font-bold p-4 rounded-xl disabled:bg-gray-300 hover:bg-blue-700 transition"
          >
            Continue to Final Step
          </button>
          <button onClick={handleBack} className="mt-4 text-sm text-gray-500 underline block">← Back</button>
        </div>
      )}

      {step === 5 && (
        <form onSubmit={handleSubmitFinal}>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Where should we send your free estimate?
          </h2>
          <p className="text-sm text-gray-500 mb-4">Enter your contact details to connect with a certified local pro.</p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="First Name"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-gray-900"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-gray-900"
            />
          </div>

          <input
            type="tel"
            placeholder="Phone Number (e.g., 214-555-0199)"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-gray-900"
          />

          <div className="mb-4">
            <TcpaCheckbox
              isChecked={formData.tcpaAccepted}
              onChange={(checked: boolean) => setFormData({ ...formData, tcpaAccepted: checked })}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            data-tf-element-role="submit"
            className="w-full bg-green-600 text-white font-bold p-4 rounded-xl hover:bg-green-700 transition"
          >
            {isSubmitting ? 'Processing Request...' : 'Calculate My Free Estimate'}
          </button>
          <button onClick={handleBack} type="button" className="mt-4 text-sm text-gray-500 underline block">← Back</button>
        </form>
      )}

      {step === 6 && (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h2>
          <p className="text-gray-600">
            Your estimate request has been submitted. A certified local contractor will reach out to you shortly.
          </p>
        </div>
      )}
    </div>
  );
};