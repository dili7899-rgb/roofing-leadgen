// components/ui/DynamicCallButton.tsx
'use client';

import React from 'react';

interface DynamicCallButtonProps {
  phoneNumber: string;
  cityName?: string;
  reason?: 'EMERGENCY_LEAK' | 'AFTER_HOURS' | 'CAPS_EXHAUSTED' | 'STANDARD_CPL';
}

export const DynamicCallButton: React.FC<DynamicCallButtonProps> = ({
  phoneNumber,
  cityName = 'your area',
  reason = 'CAPS_EXHAUSTED',
}) => {
  const getSubtext = () => {
    switch (reason) {
      case 'EMERGENCY_LEAK':
        return 'Active roof leak detected. Connect immediately with an emergency response team.';
      case 'AFTER_HOURS':
        return 'Our online processing forms are closed for the evening. Call our 24/7 dispatch line.';
      case 'CAPS_EXHAUSTED':
      default:
        return `Due to high demand in ${cityName}, online submissions are temporarily paused. Speak directly with an active contractor:`;
    }
  };

  return (
    <div className="bg-amber-50 border-2 border-amber-400 p-6 rounded-2xl shadow-xl text-center space-y-4 my-4">
      <div className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        24/7 Direct Dispatch
      </div>

      <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
        High Inquiry Volume Notice
      </h3>

      <p className="text-sm text-gray-700 leading-relaxed">
        {getSubtext()}
      </p>

      <a
        href={`tel:${phoneNumber}`}
        className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95"
      >
        📞 Call Now: {phoneNumber}
      </a>

      <p className="text-xs text-gray-500">
        Free Call • Licensed & Insured Roofing Contractors Available
      </p>
    </div>
  );
};