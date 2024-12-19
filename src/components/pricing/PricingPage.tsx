import { CheckIcon } from '@heroicons/react/24/outline';
import { SubscriptionButton } from './SubscriptionButton';
import { MAX_FREE_ANALYSES } from '../../lib/stripe';

export function PricingPage() {
  const pricingFeatures = [
    'Unlimited job descriptions',
    'Detailed CV analysis',
    'AI-powered matching',
    'Interview question generation',
    'PDF export functionality',
    'Email support'
  ];

  const proFeatures = [
    ...pricingFeatures,
    'Priority support',
    'Advanced analytics',
    'Team collaboration'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Start with a free trial, upgrade when you need more
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Free Trial Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="px-6 py-8">
              <h3 className="text-center text-2xl font-bold text-gray-900 mb-2">
                Free Trial
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Perfect for trying out our service
              </p>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
                <p className="text-sm text-gray-500 mt-1">
                  Up to {MAX_FREE_ANALYSES} CV analyses
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <SubscriptionButton plan="free" />
            </div>
          </div>

          {/* Pro Plan Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
            <div className="px-6 py-8">
              <h3 className="text-center text-2xl font-bold text-white mb-2">
                Pro Plan
              </h3>
              <p className="text-center text-blue-100 mb-6">
                For serious recruiters
              </p>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-white">$12.99</span>
                <span className="text-blue-100">/month</span>
                <p className="text-sm text-blue-100 mt-1">Unlimited analyses</p>
              </div>
              <ul className="space-y-4 mb-8">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="ml-3 text-white">{feature}</span>
                  </li>
                ))}
              </ul>
              <SubscriptionButton plan="pro" />
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