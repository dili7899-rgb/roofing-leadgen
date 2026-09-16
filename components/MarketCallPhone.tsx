'use client';

import React, { useEffect, useState } from 'react';

interface PhoneProps {
  defaultNumber: string;
  className?: string;
}

export const MarketCallPhone: React.FC<PhoneProps> = ({ defaultNumber, className }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(defaultNumber);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    setIsHydrated(true);
    if (typeof window !== 'undefined' && (window as any).mc_dni_number) {
      setPhoneNumber((window as any).mc_dni_number);
    }
  }, []);

  const rawTel = phoneNumber.replace(/\D/g, '');

  return (
    <a 
      href={`tel:+1${rawTel}`} 
      className={className || "inline-flex items-center justify-center font-bold text-xl px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg transition-transform active:scale-95"}
    >
      <svg className="w-6 h-6 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
      {isHydrated ? phoneNumber : 'Loading Direct Line...'}
    </a>
  );
};