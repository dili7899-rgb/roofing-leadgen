// Force Next.js to evaluate NOAA weather data on every single request in real-time
export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { fetchNoaaStormData } from '@/lib/noaa';
import StormDashboard from '@/components/StormDashboard';
import { RoofingForm } from '@/components/form/RoofingForm';
import { MarketCallPhone } from '@/components/MarketCallPhone';
import { getServerDniSession } from '@/lib/routing/serverDni';

interface PageProps {
  params: Promise<{ zip: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { zip } = await params;
  const storm = await fetchNoaaStormData(zip);

  if (!storm.hasRecentStorm) {
    return {
      title: `Roof Inspection Services — ZIP ${zip}`,
      robots: { index: false, follow: true },
    };
  }

  return {
    title: `Emergency Hail Damage Inspection ZIP ${zip} | Verified Service`,
    description: `Severe weather detected in ZIP ${zip} on ${storm.eventDate}. Request an official roof inspection or call directly.`,
    robots: { index: true, follow: true },
  };
}

export default async function StormZipPage({ params }: PageProps) {
  const { zip } = await params;
  
  // Parallel fetching for NOAA weather data and server-side DNI session
  const [storm, dniSession] = await Promise.all([
    fetchNoaaStormData(zip),
    getServerDniSession(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SpecialAnnouncement',
        'name': `Storm Damage Inspection in ZIP ${zip}`,
        'text': storm.hasRecentStorm
          ? `Hail size ${storm.hailSize}" recorded on ${storm.eventDate} in ZIP ${zip}. Verified free inspections available.`
          : `Roof damage restoration and inspection services for ZIP ${zip}.`,
        'spatialCoverage': {
          '@type': 'Place',
          'address': {
            '@type': 'PostalAddress',
            'postalCode': zip,
            'addressCountry': 'US',
          },
        },
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': `How do I request a roof damage check in ZIP ${zip}?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Complete our instant verified form or call the emergency intake line directly.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
            {storm.hasRecentStorm ? 'Recent Weather Event Detected' : 'Evergreen Inspection Service'}
          </span>
          <h1 className="text-3xl font-extrabold mt-4 text-slate-900">
            Roofing & Hail Damage Assessment — ZIP {zip}
          </h1>
        </section>

        <StormDashboard stormData={storm} zip={zip} />

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {/* Emergency Call Box with Dynamic Number Insertion (DNI) */}
          <div className="border border-slate-200 p-6 rounded-xl bg-slate-50 flex flex-col justify-between shadow-sm">
            <div>
              <h2 className="text-xl font-bold mb-2 text-slate-900">Speak to a Local Specialist Now</h2>
              <p className="text-sm text-gray-600 mb-6">
                Best for active leaks and urgent structural concerns. Direct line to certified contractors.
              </p>
            </div>
            
            {/* Dynamic MarketCall Phone Component */}
            <MarketCallPhone defaultNumber={dniSession.assignedNumber} />
          </div>

          {/* Lead Generation Digital Form */}
          <div className="border border-slate-200 p-6 rounded-xl bg-white shadow-sm">
            <h2 className="text-xl font-bold mb-2 text-slate-900">Request Verified Digital Inspection</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter your details below to instantly reserve your priority inspection.
            </p>
            <RoofingForm />
          </div>
        </div>
      </main>
    </>
  );
}
