import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Emergency Roof & Storm Damage Inspection | USA Property Check',
  description: 'Verified NOAA storm damage property assessments and free roofing repair estimate connections.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* TrustedForm SDK Injector */}
        <Script
          id="trusted-form"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var tf = document.createElement('script');
                tf.type = 'text/javascript'; tf.async = true;
                tf.src = (document.location.protocol == 'https:' ? 'https://' : 'http://') + 
                  'api.trustedform.com/trustedform.js?provide_referring_url=1&field=xxTrustedFormCertUrl&ping_field=xxTrustedFormPingUrl';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(tf, s);
              })();
            `,
          }}
        />
      </head>
      <body className="bg-slate-50 min-h-screen flex flex-col justify-between text-slate-900 font-sans antialiased">
        
        {/* Main Application Pages */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Global MarketCall & Compliance Legal Footer */}
        <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4 space-y-4">
            <p className="leading-relaxed">
              <strong className="text-slate-200">Matching Service Disclaimer:</strong> USARoofDamageCheck.com is a free independent information portal and matching service operated by an independent digital publisher. We are not a licensed roofing contractor, insurance agency, or construction vendor, and we do not perform home repairs directly.
            </p>
            <p className="leading-relaxed">
              This platform connects property owners with independent, third-party licensed local service providers. We do not guarantee service outcomes, pricing estimates, or contractor availability in all ZIP codes. All trademarks, service marks, and brand names belong to their respective corporate owners.
            </p>

            {/* Lead Smart Verification Marker */}
            <p className="text-slate-500 text-xs pt-2 border-t border-slate-800/50">
              Site Owner & Operator: <strong className="text-slate-300">Evtim Radulov</strong> | Verified for Lead Smart Compliance on September 7, 2026
            </p>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-800 text-slate-500">
              <span>&copy; {new Date().getFullYear()} USARoofDamageCheck. All rights reserved.</span>
              <Link href="/privacy-policy" className="hover:underline hover:text-slate-300">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:underline hover:text-slate-300">
                Terms of Service
              </Link>
              <Link href="/tcpa-consent" className="hover:underline hover:text-slate-300">
                TCPA Consent
              </Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}