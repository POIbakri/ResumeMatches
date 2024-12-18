import { SubscriptionStatus } from '../../config/pricing/types';
import { ANALYSIS_LIMITS, USAGE_THRESHOLDS } from '../../config/pricing/limits';

export function getUsageStats(subscription: SubscriptionStatus) {
  const limit = ANALYSIS_LIMITS[subscription.plan.toUpperCase()];
  const used = subscription.analysisCount;
  const remaining = Math.max(0, limit - used);
  const usagePercentage = (used / limit) * 100;

  return {
    limit,
    used,
    remaining,
    usagePercentage,
    isWarning: usagePercentage >= USAGE_THRESHOLDS.WARNING * 100,
    isCritical: usagePercentage >= USAGE_THRESHOLDS.CRITICAL * 100,
  };
}

export function canPerformAnalysis(subscription: SubscriptionStatus): boolean {
  if (subscription.status !== 'active') return false;
  return subscription.analysisCount < ANALYSIS_LIMITS[subscription.plan.toUpperCase()];
}