// components/form/TcpaCheckbox.tsx
'use client';

import React from 'react';

interface TcpaCheckboxProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  buyerName?: string;
}

export const TcpaCheckbox: React.FC<TcpaCheckboxProps> = ({
  isChecked,
  onChange,
  buyerName = 'MarketCall Lead Network Partner',
}) => {
  const consentText = `By clicking "Submit", I express consent for ${buyerName} and its licensed partners to contact me at the phone number provided above regarding roofing services via automated calls or SMS text messages. Consent is not a condition of purchase.`;

  return (
    <div className="flex items-start space-x-3 text-left my-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
      <input
        type="checkbox"
        id="tcpa-consent"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />
      <label htmlFor="tcpa-consent" className="text-xs text-gray-600 leading-relaxed cursor-pointer select-none">
        {consentText}
      </label>
      
      {/* Hidden input captured by logger.ts for the SHA-256 DOM hash */}
      <input type="hidden" id="tcpa-rendered-text" value={consentText} />
    </div>
  );
};