'use client';

import React from 'react';

interface TcpaCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  sellers?: string[];
}

export const TcpaCheckbox: React.FC<TcpaCheckboxProps> = ({
  checked,
  onChange,
  sellers = ['MarketCall Inc.', 'USARoofDamageCheck Matched Partners']
}) => {
  return (
    <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
      <input
        type="checkbox"
        id="tcpa-consent"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />
      <label htmlFor="tcpa-consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
        By checking this box, I provide my express written consent authorizing{' '}
        <span className="font-semibold text-slate-800">USARoofDamageCheck</span> and its primary matched buyers:{' '}
        <span className="font-semibold text-slate-800">{sellers.join(', ')}</span> to contact me regarding my roofing inquiry at the phone number and email provided above. I agree that contact may occur via automated telemarketing calls, artificial voice messages, prerecorded calls, and SMS/MMS text messages. I understand that consent is not required as a condition of purchase. Message and data rates may apply. Reply STOP to cancel or visit our{' '}
        <a href="/revoke" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
          Revocation Portal
        </a>.
      </label>
    </div>
  );
};
