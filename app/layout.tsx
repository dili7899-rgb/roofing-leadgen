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
        {/* 1. ActiveProspect TrustedForm SDK Injector */}
        <Script
          id="trusted-form"
          strategy="afterInteractive"
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

        {/* 2. Verisk Jornaya LeadID SDK Injector */}
        <Script
          id="jornaya-leadid"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = '//create.lidstatic.com/campaign/b828751d-0000-0000-0000-000000000000.js?snippet_version=2';
                var le = document.getElementsByTagName('script')[0];
                le.parentNode.insertBefore(s, le);
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
              <strong className="text-slate-200">Disclaimer & Matching Disclosure:</strong> USARoofDamageCheck.com is a free independent information portal and matching service operated by independent digital publisher <strong className="text-slate-300">Evtim Radulov</strong>. We are not a licensed roofing contractor, insurance agency, or construction vendor, and we do not perform home repairs directly or provide insurance claims adjusting.
            </p>
            <p className="leading-relaxed">
              This platform connects property owners with independent, third-party licensed local service providers. All contractors are independent entities, and this site does not warrant or guarantee any work performed. It is the sole responsibility of the homeowner to verify that the hired contractor furnishes the necessary license, bonding, and insurance required for the work being performed.
            </p>
            <p className="leading-relaxed">
              All persons depicted in photos or videos across this website are actors or models and not actual contractors or clients listed on USARoofDamageCheck.com. We do not guarantee service outcomes, pricing estimates, or contractor availability in all ZIP codes. Same-day and 24/7 emergency services are subject to provider participation and technician availability. All trademarks belong to their respective corporate owners.
            </p>

            {/* MarketCall Verification Marker */}
            <p className="text-slate-500 text-xs pt-2 border-t border-slate-800/50">
              Site Owner & Operator: <strong className="text-slate-300">Evtim Radulov</strong> | <strong className="text-green-500">Verified for MarketCall Compliance</strong> on September 7, 2026
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
              <Link href="/revoke" className="hover:underline hover:text-slate-300">
                Do Not Call / Revoke
              </Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
