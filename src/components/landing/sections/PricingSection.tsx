import { CheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { PRICING_PLANS } from '../../../config/pricing/plans';

export function PricingSection() {
  return (
    <div className="relative bg-white py-12 xs:py-16 sm:py-20 lg:py-24 overflow-hidden border border-blue-500/20 rounded-lg" id="pricing">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="absolute -top-20 xs:-top-30 sm:-top-40 -right-20 xs:-right-30 sm:-right-40 w-40 xs:w-60 sm:w-80 h-40 xs:h-60 sm:h-80 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 xs:-bottom-30 sm:-bottom-40 -left-20 xs:-left-30 sm:-left-40 w-40 xs:w-60 sm:w-80 h-40 xs:h-60 sm:h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 xs:mb-12 lg:mb-16">
          <p className="inline-flex items-center px-3 xs:px-4 py-1 xs:py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm text-blue-600 text-xs xs:text-sm font-medium mb-3 xs:mb-4">
            Flexible Plans
          </p>
          <h2 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-2 xs:mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that's right for your recruitment needs
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8">
          {/* Free Plan */}
          <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-4 xs:p-6 sm:p-8">
              <h3 className="text-xl xs:text-2xl font-bold text-gray-900 text-center mb-1 xs:mb-2">
                {PRICING_PLANS.FREE.name}
              </h3>
              <p className="text-sm xs:text-base text-center text-gray-600 mb-4 xs:mb-6">
                Perfect for trying out our service
              </p>
              <div className="text-center mb-6 xs:mb-8">
                <span className="text-4xl xs:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">$0</span>
                <span className="text-gray-600">/month</span>
                <p className="text-xs xs:text-sm text-gray-500 mt-1 xs:mt-2">
                  Up to {PRICING_PLANS.FREE.analysisLimit} CV analyses
                </p>
              </div>
              <ul className="space-y-3 xs:space-y-4 mb-6 xs:mb-8">
                {PRICING_PLANS.FREE.features.map((feature, index) => (
                  <li key={index} className="flex items-start group/item">
                    <CheckIcon className="h-4 xs:h-5 w-4 xs:w-5 text-green-500 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="ml-2 xs:ml-3 text-sm xs:text-base text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="block w-full bg-gray-100 text-gray-800 text-center py-3 xs:py-4 rounded-xl text-sm xs:text-base font-medium hover:bg-gray-200 transition-all duration-300 hover:shadow-lg"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="group relative bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="relative p-4 xs:p-6 sm:p-8">
              <h3 className="text-xl xs:text-2xl font-bold text-white text-center mb-1 xs:mb-2">
                {PRICING_PLANS.PRO.name}
              </h3>
              <p className="text-sm xs:text-base text-center text-blue-100 mb-4 xs:mb-6">
                For serious recruiters
              </p>
              <div className="text-center mb-6 xs:mb-8">
                <span className="text-4xl xs:text-5xl font-bold text-white">${PRICING_PLANS.PRO.price}</span>
                <span className="text-blue-100">/month</span>
                <p className="text-xs xs:text-sm text-blue-100 mt-1 xs:mt-2">
                  {PRICING_PLANS.PRO.analysisLimit} analyses per month
                </p>
              </div>
              <ul className="space-y-3 xs:space-y-4 mb-6 xs:mb-8">
                {PRICING_PLANS.PRO.features.map((feature, index) => (
                  <li key={index} className="flex items-start group/item">
                    <CheckIcon className="h-4 xs:h-5 w-4 xs:w-5 text-white flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="ml-2 xs:ml-3 text-sm xs:text-base text-white">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="block w-full bg-white text-blue-600 text-center py-3 xs:py-4 rounded-xl text-sm xs:text-base font-medium hover:bg-blue-50 transition-all duration-300 hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}