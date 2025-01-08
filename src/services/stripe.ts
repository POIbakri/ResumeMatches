import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../lib/supabase';

interface SubscriptionStatus {
  status: string;
  plan: string;
  analysisCount: number;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error('Missing Stripe public key');
}

export const stripe = loadStripe(stripePublicKey);

// Get subscription status
export async function getSubscriptionStatus(userId: string): Promise<SubscriptionStatus> {
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    throw new Error('Failed to get subscription status');
  }

  return {
    status: subscription.status,
    plan: subscription.plan,
    analysisCount: subscription.analysis_count,
    currentPeriodEnd: subscription.current_period_end,
    cancelAtPeriodEnd: subscription.cancel_at_period_end
  };
}

// Increment analysis count for a user
export async function incrementAnalysisCount(userId: string) {
  const { error } = await supabase.rpc('increment_analysis_count', {
    user_id: userId
  });

  if (error) {
    throw new Error(`Failed to increment analysis count: ${error.message}`);
  }
}