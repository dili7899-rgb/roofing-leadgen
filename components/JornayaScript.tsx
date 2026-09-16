// components/JornayaScript.tsx
'use client';

import Script from 'next/script';

export const JornayaScript = () => {
  return (
    <>
      {/* Jornaya LeadID Async Script Injector */}
      <Script
        id="jornaya-leadid"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var s = document.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = '//create.lidstatic.com/campaign/YOUR_JORNAYA_CAMPAIGN_ID.js?snippet_version=2';
              var e = document.getElementsByTagName('script')[0];
              e.parentNode.insertBefore(s, e);
            })();
          `,
        }}
      />
      {/* Hidden input field auto-populated by Jornaya SDK */}
      <input type="hidden" id="leadid_token" name="universal_leadid" />
    </>
  );
};