import { CheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { PRICING_PLANS } from '../../../config/pricing/plans';

export function PricingSection() {
  return (
    <div className="bg-gray-50 py-24" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that's right for your recruitment needs
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                {PRICING_PLANS.FREE.name}
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Perfect for trying out our service
              </p>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
                <p className="text-sm text-gray-500 mt-1">
                  Up to {PRICING_PLANS.FREE.analysisLimit} CV analyses
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {PRICING_PLANS.FREE.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="block w-full bg-gray-100 text-gray-800 text-center py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                {PRICING_PLANS.PRO.name}
              </h3>
              <p className="text-center text-blue-100 mb-6">
                For serious recruiters
              </p>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-white">${PRICING_PLANS.PRO.price}</span>
                <span className="text-blue-100">/month</span>
                <p className="text-sm text-blue-100 mt-1">
                  {PRICING_PLANS.PRO.analysisLimit} analyses per month
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {PRICING_PLANS.PRO.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="ml-3 text-white">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="block w-full bg-white text-blue-600 text-center py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            All plans include a 14-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
}