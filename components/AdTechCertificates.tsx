// components/AdTechCertificates.tsx
'use client';

import Script from 'next/script';

export const AdTechCertificates = () => {
  return (
    <>
      {/* 1. ActiveProspect TrustedForm Script */}
      <Script
        id="trustedform-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var tf = document.createElement('script');
              tf.type = 'text/javascript'; tf.async = true;
              tf.src = ("https:" == document.location.protocol ? "https://" : "http://") + "api.trustedform.com/trustedform.js?provide_referral=https%3A%2F%2Ftrustedform.com&field=xxTrustedFormCertUrl&ping_field=xxTrustedFormPingUrl";
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(tf, s);
            })();
          `,
        }}
      />
      <noscript>
        <img src="https://api.trustedform.com/ns.gif" alt="" />
      </noscript>

      {/* 2. Verisk Jornaya LeadID Script */}
      <Script
        id="jornaya-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var s = document.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = '//create.lidstatic.com/campaign/b828751d-YOUR-CAMPAIGN-ID.js?snippet_version=2';
              var ee = document.getElementsByTagName('script')[0];
              ee.parentNode.insertBefore(s, ee);
            })();
          `,
        }}
      />
      <noscript>
        <img src="//create.leadid.com/noscript.gif?lac=YOUR-ACCOUNT-CODE" alt="" />
      </noscript>
    </>
  );
};