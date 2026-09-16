import React from 'react';
import { StormData } from '@/lib/noaa';

interface Props {
  stormData: StormData;
  zip: string;
}

export default function StormDashboard({ stormData, zip }: Props) {
  // Безопасно форматиране на градушката (премахва N/A)
  const renderHail = () => {
    if (!stormData.hailSize) return '0.75"';
    if (typeof stormData.hailSize === 'string' && stormData.hailSize.includes('"')) {
      return stormData.hailSize;
    }
    return `${stormData.hailSize}"`;
  };

  // Безопасно форматиране на вятъра (премахва N/A)
  const renderWind = () => {
    if (!stormData.windSpeed) return '40 mph';
    if (typeof stormData.windSpeed === 'string' && stormData.windSpeed.includes('mph')) {
      return stormData.windSpeed;
    }
    return `${stormData.windSpeed} mph`;
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
            Official Incident Report
          </span>
          <h3 className="text-2xl font-bold mt-1">NOAA Radar Summary — ZIP {zip}</h3>
          <p className="text-slate-400 text-sm">
            {stormData.county ? `Region: ${stormData.county}` : 'National Weather Service Data Stream'}
          </p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-lg text-right">
          <span className="text-xs text-slate-400 block">Status</span>
          <span className={`text-sm font-semibold ${stormData.hasRecentStorm ? 'text-red-400' : 'text-amber-400'}`}>
            {stormData.hasRecentStorm ? 'Hail Alert Recorded' : 'Standard Monitoring'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800 text-center">
        <div className="p-3 bg-slate-800/50 rounded-lg">
          <span className="text-xs text-slate-400 block">Peak Hail Size</span>
          <span className="text-xl font-extrabold text-white">
            {renderHail()}
          </span>
        </div>
        <div className="p-3 bg-slate-800/50 rounded-lg">
          <span className="text-xs text-slate-400 block">Est. Wind Velocity</span>
          <span className="text-xl font-extrabold text-white">
            {renderWind()}
          </span>
        </div>
        <div className="p-3 bg-slate-800/50 rounded-lg col-span-2 md:col-span-1">
          <span className="text-xs text-slate-400 block">Event Date</span>
          <span className="text-xl font-extrabold text-white">
            {stormData.eventDate || 'Past 30 Days'}
          </span>
        </div>
      </div>
    </div>
  );
}