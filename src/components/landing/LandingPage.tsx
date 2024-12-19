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
    <div className="bg-white">
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
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#features" className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Pricing
                  </a>
                </li>
                <li>
                  <Link to="/login" className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/docs" className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/privacy" className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/about" className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
              <div className="flex items-center space-x-2">
                <img
                  src="/images/logo.png"
                  alt="Company Logo"
                  className="h-16 w-auto"
                />
              </div>
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}