'use client';

import React, { useState, useEffect } from 'react';

interface CipaShieldProps {
  onConsentGiven: () => void;
}

export const CipaShield: React.FC<CipaShieldProps> = ({ onConsentGiven }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    // Check user timezone or geolocation hint for California
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (userTimezone === 'America/Los_Angeles') {
      setShowModal(true);
    }
  }, []);

  const handleAccept = () => {
    setShowModal(false);
    onConsentGiven();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 text-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Privacy & Session Verification Notice</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          To protect consumers and comply with California privacy standards, this website uses standard fraud detection and session logging tools (ActiveProspect TrustedForm / Jornaya LeadID) to verify authentic interactions.
        </p>
        <p className="text-xs text-slate-500">
          By clicking <strong>"I Understand & Continue"</strong>, you acknowledge and agree to session verification and DOM interaction logging for legal compliance purposes.
        </p>
        <button
          onClick={handleAccept}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
        >
          I Understand & Continue
        </button>
      </div>
    </div>
  );
};
