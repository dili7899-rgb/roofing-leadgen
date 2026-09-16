// lib/geo/cloudflare.ts
import { headers } from 'next/headers';

export interface GeoLocation {
  city: string;
  state: string;
  country: string;
  ip: string;
}

/**
 * Extracts real-time visitor geo-location data from Edge headers (Cloudflare / Vercel).
 * Falls back to default values (Dallas, TX) for local development or missing headers.
 */
export async function getGeoContext(): Promise<GeoLocation> {
  const headerList = await headers();

  const city =
    headerList.get('cf-ipcity') ||
    headerList.get('x-vercel-ip-city') ||
    'Dallas';

  const state =
    headerList.get('cf-region-code') ||
    headerList.get('x-vercel-ip-country-region') ||
    'TX';

  const country =
    headerList.get('cf-ipcountry') ||
    headerList.get('x-vercel-ip-country') ||
    'US';

  const ip =
    headerList.get('cf-connecting-ip') ||
    headerList.get('x-forwarded-for')?.split(',')[0] ||
    '127.0.0.1';

  return {
    city: decodeURIComponent(city),
    state,
    country,
    ip,
  };
}