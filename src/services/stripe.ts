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

// Update subscription details (called from webhook)
export async function updateSubscriptionStatus(
  stripeSubscriptionId: string,
  status: string,
  currentPeriodStart: string,
  currentPeriodEnd: string,
  cancelAtPeriodEnd: boolean
) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status,
      current_period_start: currentPeriodStart,
      current_period_end: currentPeriodEnd,
      cancel_at_period_end: cancelAtPeriodEnd,
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', stripeSubscriptionId);

  if (error) {
    throw new Error(`Failed to update subscription: ${error.message}`);
  }
}

// Create initial subscription record (called from webhook)
export async function createSubscription(
  userId: string,
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  plan: string,
  currentPeriodStart: string,
  currentPeriodEnd: string
) {
  console.log('Creating subscription with data:', {
    userId,
    stripeCustomerId,
    stripeSubscriptionId,
    plan,
    currentPeriodStart,
    currentPeriodEnd
  });

  const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: userId,
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: stripeSubscriptionId,
      plan,
      status: 'active',
      current_period_start: currentPeriodStart,
      current_period_end: currentPeriodEnd,
      cancel_at_period_end: false,
      analysis_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create subscription:', error);
    throw new Error(`Failed to create subscription: ${error.message}`);
  }

  console.log('Subscription created:', data);
  return data;
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