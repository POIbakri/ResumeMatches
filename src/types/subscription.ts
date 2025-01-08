export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  plan: 'free' | 'pro';
  status: 'active' | 'canceled';
  analysis_count: number;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export interface SubscriptionHook {
  subscription: Subscription | null;
  loading: boolean;
  canAnalyze: () => boolean;
  remainingAnalyses: () => number;
}