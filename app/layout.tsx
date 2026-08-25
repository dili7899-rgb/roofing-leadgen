import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Emergency Roof & Storm Damage Inspection',
  description: 'Verified NOAA storm damage property assessments.',
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
      </head>
      <body className="bg-slate-50">{children}</body>
    </html>
  );
}
