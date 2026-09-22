import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">USA Roof Damage Check</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting property owners with verified local roofing replacement specialists after severe storm events.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium text-sm mb-3 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-white transition-colors">
                  Storm Damage Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-sm mb-3 uppercase tracking-wider">Legal & Compliance</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/tcpa-consent" className="hover:text-white transition-colors">
                  TCPA Compliance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-sm mb-3 uppercase tracking-wider">Coverage Notice</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Free matching service connecting property owners with independent licensed roofing contractors across all US markets.
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* COMPLETE UNIFIED LEGAL DISCLAIMER (ORIGINAL + MARKETCALL)     */}
        {/* ------------------------------------------------------------- */}
        <div className="pt-8 border-t border-gray-800 text-[11px] leading-relaxed text-gray-500 space-y-3">
          <p>
            <strong className="text-gray-400">Disclaimer & Matching Disclosure:</strong> USARoofDamageCheck.com is a free independent information portal and matching service operated by an independent digital publisher. We are not a licensed roofing contractor, insurance agency, or construction vendor, and we do not perform home repairs directly or provide insurance claims adjusting.
          </p>
          <p>
            This site is a free service to assist homeowners in connecting with local service providers. All contractors and providers are independent entities, and this site does not warrant or guarantee any work performed. It is the sole responsibility of the homeowner to verify that the hired contractor furnishes the necessary license, bonding, and insurance required for the work being performed.
          </p>
          <p>
            All persons depicted in photos or videos across this website are actors or models and not actual contractors or clients listed on this site. All trademarks, service marks, and brand names featured on this site belong to their respective corporate owners.
          </p>
          <p>
            <strong className="text-gray-400">Availability & Service Notice:</strong> We do not guarantee service outcomes, pricing estimates, or contractor availability in all ZIP codes. Same-day and 24/7 emergency services are subject to provider participation, location, technician availability, and local demand. Availability is not guaranteed and may vary by market and capacity.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} USARoofDamageCheck.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
