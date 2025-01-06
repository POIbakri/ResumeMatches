import { useState, useEffect } from 'react';
import { useAuth } from './auth/useAuth';
import { getSubscriptionStatus, getRemainingAnalyses, canPerformAnalysis } from '../services/pricing/subscription';
import type { SubscriptionStatus, PlanId } from '../config/pricing/types';

export function useSubscription() {
  const { session } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchSubscription() {
      if (!session?.user) {
        if (isMounted) {
          // Set a basic free subscription for non-authenticated users
          setSubscription({
            status: 'active',
            plan: 'free',
            analysisCount: 0,
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            cancelAtPeriodEnd: false
          });
          setLoading(false);
        }
        return;
      }

      try {
        // Add delay to prevent rapid refetching
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const status = await getSubscriptionStatus(session.user.id);
        
        if (isMounted) {
          // Validate subscription data
          if (!status || !['active', 'inactive', 'trialing'].includes(status.status)) {
            throw new Error('Invalid subscription data received');
          }
          
          setSubscription(status);
          setError(null);
        }
      } catch (err) {
        console.error('Subscription fetch error:', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch subscription'));
          // Set default subscription state on error with more restrictive settings
          setSubscription({
            status: 'active',
            plan: 'free' as PlanId,
            analysisCount: 0,
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchSubscription();

    // Set up subscription refresh interval
    const refreshInterval = setInterval(fetchSubscription, 60000); // Refresh every minute

    return () => {
      isMounted = false;
      clearInterval(refreshInterval);
    };
  }, [session]);

  return {
    subscription,
    loading,
    error,
    canAnalyze: subscription ? canPerformAnalysis(subscription) : false,
    remainingAnalyses: subscription ? getRemainingAnalyses(subscription) : 0,
    isPro: subscription?.plan === 'pro'
  };
}