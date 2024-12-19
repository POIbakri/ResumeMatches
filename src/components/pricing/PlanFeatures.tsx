import { CheckIcon } from '@heroicons/react/24/outline';
import type { PricingPlan } from '../../config/pricing/types';

interface PlanFeaturesProps {
  plan: PricingPlan;
}

export function PlanFeatures({ plan }: PlanFeaturesProps) {
  return (
    <ul className="space-y-4 mb-8">
      {plan.features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <span className="ml-3 text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
  );
}