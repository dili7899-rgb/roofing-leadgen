// components/form/OtpModal.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface OtpModalProps {
  isOpen: boolean;
  phoneNumber: string;
  onVerified: (code: string) => void;
  onFallbackToCall: () => void;
}

export const OtpModal: React.FC<OtpModalProps> = ({
  isOpen,
  phoneNumber,
  onVerified,
  onFallbackToCall,
}) => {
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(20);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 4) {
      setIsSubmitting(true);
      onVerified(code);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 text-center">
          Verify Your Phone Number
        </h3>
        <p className="text-sm text-gray-600 text-center mt-2">
          We sent a 4-digit code to <span className="font-semibold text-gray-800">{phoneNumber}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            autoFocus
            autoComplete="one-time-code" // WebOTP API native support (iOS/Android)
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="• • • •"
            className="w-full text-center text-3xl font-bold tracking-widest py-3 border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100"
          />

          <button
            type="submit"
            disabled={code.length !== 4 || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
          >
            {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>

        <div className="mt-4 text-center">
          {timer > 0 ? (
            <span className="text-xs text-gray-400">
              SMS code should arrive within {timer}s
            </span>
          ) : (
            <button
              onClick={onFallbackToCall}
              type="button"
              className="text-xs text-blue-600 font-bold hover:underline block mx-auto mt-2"
            >
              Didn't receive a code? Connect via direct call →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};