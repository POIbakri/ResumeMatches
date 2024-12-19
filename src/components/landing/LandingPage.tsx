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

      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#features" className="text-base text-gray-500 hover:text-gray-900">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-base text-gray-500 hover:text-gray-900">
                    Pricing
                  </a>
                </li>
                <li>
                  <Link to="/login" className="text-base text-gray-500 hover:text-gray-900">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/docs" className="text-base text-gray-500 hover:text-gray-900">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-base text-gray-500 hover:text-gray-900">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/about" className="text-base text-gray-500 hover:text-gray-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              © {new Date().getFullYear()} Plus+ Talent. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}