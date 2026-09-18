'use client';

import React from 'react';
import Link from 'next/link';

interface TcpaCheckboxProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  buyerName?: string;
}

export const TcpaCheckbox: React.FC<TcpaCheckboxProps> = ({
  isChecked,
  onChange,
  buyerName = 'MarketCall & Network Partners',
}) => {
  const consentText = `By checking this box and clicking Submit, I provide prior express written consent authorizing USARoofDamageCheck, ${buyerName}, and up to four (4) matching local licensed roofing contractors to contact me at the phone number provided above via automated calls, prerecorded messages, or SMS/MMS text messages regarding roofing services. Consent is voluntary and not a condition of purchasing any service. I also agree to the Terms of Service, Privacy Policy, and TCPA Terms.`;

  return (
    <div className="flex items-start space-x-3 text-left my-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
      <input
        type="checkbox"
        id="tcpa-consent"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />
      <label htmlFor="tcpa-consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
        By checking this box and clicking Submit, I provide prior express written consent authorizing <strong>USARoofDamageCheck</strong>, {buyerName}, and up to four (4) matching contractors to contact me via automated calls or SMS at the phone number provided. Consent is voluntary and not required to purchase. See our{' '}
        <Link href="/terms" target="_blank" className="text-blue-600 underline font-medium">Terms</Link>,{' '}
        <Link href="/privacy-policy" target="_blank" className="text-blue-600 underline font-medium">Privacy Policy</Link>, and{' '}
        <Link href="/tcpa-consent" target="_blank" className="text-blue-600 underline font-medium">TCPA Terms</Link>.
      </label>
      
      {/* Hidden input captured by logger.ts for the SHA-256 DOM hash */}
      <input type="hidden" id="tcpa-rendered-text" value={consentText} />
    </div>
  );
};