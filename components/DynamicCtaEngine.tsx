'use client';

import React, { useEffect, useState } from 'react';
// Импортираме от подпапката form:
import { RoofingForm } from './form/RoofingForm';
import { isMarketCallOpen } from '../lib/schedule';

interface Props {
  stateCode?: string;
  phoneNumber?: string;
}

export const DynamicCtaEngine: React.FC<Props> = ({
  stateCode = 'TX',
  phoneNumber = '1-800-555-0199',
}) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const openStatus = isMarketCallOpen(stateCode);
    setIsOpen(openStatus);
  }, [stateCode]);

  if (isOpen === null) {
    return <div className="p-4 text-center text-gray-500">Checking availability...</div>;
  }

  return (
    <div className="w-full max-w-xl mx-auto my-6">
      {isOpen ? (
        /* DAYTIME: Inbound Click-to-Call */
        <div className="bg-blue-600 text-white p-6 rounded-2xl text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-2">
            Live Storm Inspectors Available Now
          </h3>
          <p className="text-blue-100 mb-4">
            Call now for a free roof & hail damage assessment in your area.
          </p>
          <a
            href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-extrabold text-xl px-8 py-4 rounded-xl transition shadow-md"
          >
            📞 Call {phoneNumber}
          </a>
          <p className="text-xs text-blue-200 mt-3">
            Average wait time: &lt; 1 min | No obligation
          </p>
        </div>
      ) : (
        /* NIGHTTIME: 60-second Form Lead Generation */
        <div>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-4 rounded text-sm text-amber-800">
            🌙 Phone lines are currently closed. Fill out the 60-second form below to reserve your priority inspection slot for tomorrow morning.
          </div>
          <RoofingForm />
        </div>
      )}
    </div>
  );
};