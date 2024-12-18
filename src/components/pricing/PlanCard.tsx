import React from 'react';
import { PlanFeatures } from './PlanFeatures';
import { SubscriptionButton } from './SubscriptionButton';
import type { PricingPlan } from '../../config/pricing/types';

interface PlanCardProps {
  plan: PricingPlan;
  highlighted?: boolean;
}

export function PlanCard({ plan, highlighted = false }: PlanCardProps) {
  const baseClasses = "rounded-2xl shadow-lg overflow-hidden p-8";
  const cardClasses = highlighted
    ? `${baseClasses} bg-gradient-to-br from-blue-600 to-indigo-600 text-white transform hover:scale-105 transition-transform`
    : `${baseClasses} bg-white border border-gray-200`;

  const priceClasses = highlighted ? "text-white" : "text-gray-900";
  const descriptionClasses = highlighted ? "text-blue-100" : "text-gray-600";

  return (
    <div className={cardClasses}>
      <h3 className="text-center text-2xl font-bold mb-2">{plan.name}</h3>
      <p className="text-center mb-6 text-sm">{plan.analysisLimit} analyses per month</p>
      
      <div className="text-center mb-6">
        <span className={`text-4xl font-bold ${priceClasses}`}>${plan.price}</span>
        <span className={descriptionClasses}>/{plan.period}</span>
      </div>

      <PlanFeatures plan={plan} />
      <SubscriptionButton plan={plan.id} />
    </div>
  );
}