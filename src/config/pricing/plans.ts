import { PricingPlan } from './types';

export const FREE_PLAN: PricingPlan = {
  id: 'free',
  name: 'Free Trial',
  price: 0,
  period: 'month',
  analysisLimit: 4,
  features: [
    'Up to 4 CV analyses',
    'Basic interview questions',
    'PDF export functionality',
    'Email support'
  ]
};

export const PRO_PLAN: PricingPlan = {
  id: 'pro',
  name: 'Pro Plan',
  price: 9.99,
  period: 'month',
  analysisLimit: 1000,
  features: [
    '1000 CV analyses per month',
    'Advanced AI matching',
    'Custom interview plans',
    'Technical skill assessment',
    'Team collaboration',
    'Priority support',
    'Analytics dashboard',
    'Bulk analysis - Coming soon',
    'API access - Coming soon'
  ]
};

export const PRICING_PLANS = {
  FREE: FREE_PLAN,
  PRO: PRO_PLAN
} as const;