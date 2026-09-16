'use client';

import React from 'react';

interface Props {
  promoNumber: string;
  zip: string;
}

export default function CallButton({ promoNumber, zip }: Props) {
  const handleCall = () => {
    window.location.href = `tel:${promoNumber.replace(/[^0-9]/g, '')}`;
  };

  return (
    <div className="text-center w-full">
      <button
        onClick={handleCall}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        Call Hotline: {promoNumber}
      </button>
      <span className="text-xs text-gray-500 mt-2 block">
        Direct connection for ZIP {zip}. No SMS verification required.
      </span>
    </div>
  );
}