import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import { getSubscriptionStatus, getRemainingAnalyses, canPerformAnalysis } from '../../services/pricing/subscription';
import type { SubscriptionStatus } from '../../config/pricing/types';

export function useSubscription() {
  const { session } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscription() {
      if (!session?.user) {
        setSubscription(null);
        setLoading(false);
        return;
      }

      try {
        const status = await getSubscriptionStatus(session.user.id);
        setSubscription(status);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [session]);

  return {
    subscription,
    loading,
    canAnalyze: subscription ? canPerformAnalysis(subscription) : false,
    remainingAnalyses: subscription ? getRemainingAnalyses(subscription) : 0
  };
}