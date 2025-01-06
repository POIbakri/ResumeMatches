import { Navbar } from './sections/Navbar';
import { HeroSection } from './sections/HeroSection';
import { FeaturesGrid } from './sections/FeaturesGrid';
import { StatsSection } from './sections/StatsSection';
import { HowItWorks } from './sections/HowItWorks';
import { Testimonials } from './sections/Testimonials';
import { PricingSection } from './sections/PricingSection';
import { TrustedBy } from './sections/TrustedBy';
import { CTASection } from './sections/CTASection';

export function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustedBy />
      <FeaturesGrid />
      <HowItWorks />
      <StatsSection />
      <Testimonials />
      <PricingSection />
      <CTASection />

      <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-8 xs:py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xs:flex-row items-center justify-between space-y-4 xs:space-y-0">
            <div className="flex flex-col items-center xs:items-start space-y-2">
              <div className="flex items-center space-x-2">
                <img
                  src="/images/logo.png"
                  alt="Company Logo"
                  className="h-10 xs:h-12 sm:h-16 w-auto"
                />
              </div>
              <p className="text-sm xs:text-base text-gray-600">TopMatchTalent.com</p>
              <a href="mailto:talent@topmatchtalent.com" className="text-sm xs:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                talent@topmatchtalent.com
              </a>
            </div>
            <p className="text-xs xs:text-sm text-gray-500">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}