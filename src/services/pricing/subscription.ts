import { supabase } from '../../lib/supabase';
import { ANALYSIS_LIMITS } from '../../config/pricing/limits';
import { handleError } from '../../lib/error-handling';
import type { SubscriptionStatus } from '../../config/pricing/types';

export async function getSubscriptionStatus(userId: string): Promise<SubscriptionStatus> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    return {
      status: data.status,
      plan: data.plan,
      analysisCount: data.analysis_count,
      currentPeriodEnd: data.current_period_end
    };
  } catch (error) {
    handleError(error);
    // Return free plan as fallback
    return {
      status: 'active',
      plan: 'free',
      analysisCount: 0
    };
  }
}

export async function getRemainingAnalyses(subscription: SubscriptionStatus): Promise<number> {
  const limit = ANALYSIS_LIMITS[subscription.plan.toUpperCase()];
  return Math.max(0, limit - subscription.analysisCount);
}

export function canPerformAnalysis(subscription: SubscriptionStatus): boolean {
  if (subscription.status !== 'active') return false;
  return subscription.analysisCount < ANALYSIS_LIMITS[subscription.plan.toUpperCase()];
}