export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled';
export type SubscriptionPlan = 'free' | 'pro';

export interface Subscription {
  id: string;
  status: SubscriptionStatus;
  plan: SubscriptionPlan;
  analysisCount: number;
  currentPeriodEnd?: string;
}

export interface SubscriptionHook {
  subscription: Subscription | null;
  loading: boolean;
  canAnalyze: () => boolean;
  remainingAnalyses: () => number;
}