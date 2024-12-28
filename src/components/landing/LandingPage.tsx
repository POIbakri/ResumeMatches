import { Link } from 'react-router-dom';
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
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-x-4 xs:gap-x-6 sm:gap-x-8 gap-y-8 xs:gap-y-10">
            <div className="space-y-4 xs:space-y-5 sm:space-y-6">
              <h3 className="text-xs xs:text-sm font-semibold text-gray-500 tracking-wider uppercase">Product</h3>
              <ul className="mt-2 xs:mt-3 sm:mt-4 space-y-2 xs:space-y-3 sm:space-y-4">
                <li>
                  <a href="#features" className="text-sm xs:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm xs:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Pricing
                  </a>
                </li>
                <li>
                  <Link to="/login" className="text-sm xs:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4 xs:space-y-5 sm:space-y-6">
              <h3 className="text-xs xs:text-sm font-semibold text-gray-500 tracking-wider uppercase">Support</h3>
              <ul className="mt-2 xs:mt-3 sm:mt-4 space-y-2 xs:space-y-3 sm:space-y-4">
                <li>
                  <Link to="/docs" className="text-sm xs:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-sm xs:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4 xs:space-y-5 sm:space-y-6">
              <h3 className="text-xs xs:text-sm font-semibold text-gray-500 tracking-wider uppercase">Legal</h3>
              <ul className="mt-2 xs:mt-3 sm:mt-4 space-y-2 xs:space-y-3 sm:space-y-4">
                <li>
                  <Link to="/privacy" className="text-sm xs:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm xs:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4 xs:space-y-5 sm:space-y-6">
              <h3 className="text-xs xs:text-sm font-semibold text-gray-500 tracking-wider uppercase">Company</h3>
              <ul className="mt-2 xs:mt-3 sm:mt-4 space-y-2 xs:space-y-3 sm:space-y-4">
                <li>
                  <Link to="/about" className="text-sm xs:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm xs:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 xs:mt-10 sm:mt-12 pt-6 xs:pt-7 sm:pt-8 border-t border-gray-200">
            <div className="flex flex-col xs:flex-row items-center justify-between space-y-4 xs:space-y-0">
              <div className="flex items-center space-x-2">
                <img
                  src="/images/logo.png"
                  alt="Company Logo"
                  className="h-10 xs:h-12 sm:h-16 w-auto"
                />
              </div>
              <p className="text-xs xs:text-sm text-gray-500">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}