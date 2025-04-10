import { supabase } from '../../lib/supabase';
import { ANALYSIS_LIMITS } from '../../config/pricing/limits';
import type { SubscriptionStatus } from '../../config/pricing/types';

export async function getSubscriptionStatus(userId: string): Promise<SubscriptionStatus> {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('status, plan, analysis_count, current_period_end, cancel_at_period_end')
      .eq('user_id', userId)
      .maybeSingle();

    // Handle Supabase specific errors
    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    // If no subscription found, return default free plan
    if (!data) {
      return {
        status: 'active',
        plan: 'free',
        analysisCount: 0,
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false
      };
    }

    // Check if subscription is in grace period
    const isGracePeriod = data.cancel_at_period_end && 
      new Date(data.current_period_end) > new Date();

    // Ensure the response matches our expected format
    return {
      status: isGracePeriod ? 'active' : data.status || 'active',
      plan: data.plan || 'free',
      analysisCount: data.analysis_count || 0,
      currentPeriodEnd: data.current_period_end || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: data.cancel_at_period_end || false
    };

  } catch (error) {
    console.error('Subscription error:', error);
    // Return a safe default state instead of throwing
    return {
      status: 'active',
      plan: 'free',
      analysisCount: 0,
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false
    };
  }
}

export async function getRemainingAnalyses(subscription: SubscriptionStatus): Promise<number> {
  try {
    // If subscription is cancelled but in grace period, still allow usage
    if (subscription.cancelAtPeriodEnd) {
      const periodEnd = new Date(subscription.currentPeriodEnd || '');
      if (periodEnd < new Date()) {
        return 0;
      }
    }

    const plan = subscription.plan.toUpperCase() as keyof typeof ANALYSIS_LIMITS;
    const limit = ANALYSIS_LIMITS[plan];
    return Math.max(0, limit - (subscription.analysisCount || 0));
  } catch (error) {
    console.error('Error calculating remaining analyses:', error);
    return 0; // Safe default
  }
}

export function canPerformAnalysis(subscription: SubscriptionStatus): boolean {
  try {
    if (!subscription || subscription.status !== 'active') return false;

    // Check if subscription is cancelled and period has ended
    if (subscription.cancelAtPeriodEnd) {
      const periodEnd = new Date(subscription.currentPeriodEnd || '');
      if (periodEnd < new Date()) {
        return false;
      }
    }

    const plan = subscription.plan.toUpperCase() as keyof typeof ANALYSIS_LIMITS;
    const limit = ANALYSIS_LIMITS[plan];
    return (subscription.analysisCount || 0) < limit;
  } catch (error) {
    console.error('Error checking analysis permission:', error);
    return false; // Safe default
  }
}