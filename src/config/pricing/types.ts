export type PlanId = 'free' | 'pro';

export interface PricingPlan {
  id: PlanId;
  name: string;
  price: number;
  period: string;
  analysisLimit: number;
  features: string[];
}

export interface SubscriptionStatus {
  status: 'active' | 'inactive' | 'trialing';
  plan: PlanId;
  analysisCount: number;
  currentPeriodEnd?: string;
}