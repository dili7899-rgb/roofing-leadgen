'use client';

import React from 'react';
import { MarketCallPhone } from './MarketCallPhone';

interface StormHeroProps {
  zipCode: string;
  cityName: string;
  damageType?: string;
}

export const StormHero: React.FC<StormHeroProps> = ({ zipCode, cityName, damageType = "Hail & Water Damage" }) => {
  const defaultNumber = process.env.NEXT_PUBLIC_MARKETCALL_ROOFING_NUMBER || "1-800-555-0199";

  return (
    <section className="bg-slate-900 text-white py-8 px-4 rounded-2xl border border-red-500/30 shadow-2xl relative overflow-hidden my-4">
      <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-[11px] font-black uppercase tracking-widest text-center py-1 animate-pulse">
        ⚠️ Active Alert: Immediate Inspection Period Open for {zipCode}
      </div>

      <div className="mt-4 text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {cityName} Emergency <span className="text-amber-400">{damageType}</span> Assessment
        </h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Severe weather detected in <span className="font-bold text-white">{zipCode}</span>. Insurance carriers enforce strict filing deadlines. Speak with a licensed local specialist immediately.
        </p>

        <div className="flex items-center justify-center space-x-2 text-xs text-emerald-400 font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span>47 Homeowners in {cityName} connected in the last 72 hours</span>
        </div>

        <div className="pt-2">
          <MarketCallPhone defaultNumber={defaultNumber} />
        </div>

        <p className="text-[10px] text-slate-400">
          Free 15-minute diagnostic • No financial obligation • Licensed inspection team
        </p>
      </div>
    </section>
  );
};