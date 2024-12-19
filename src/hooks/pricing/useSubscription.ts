import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import { getSubscriptionStatus, getRemainingAnalyses, canPerformAnalysis } from '../../services/pricing/subscription';
import type { SubscriptionStatus } from '../../config/pricing/types';

export function useSubscription() {
  const { session } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSubscription() {
      if (!session?.user) {
        setSubscription(null);
        setLoading(false);
        return;
      }

      try {
        const response = await getSubscriptionStatus(session.user.id);
        
        // Validate response is proper JSON before setting
        if (typeof response === 'object' && response !== null) {
          setSubscription(response);
          setError(null);
        } else {
          throw new Error('Invalid subscription response format');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch subscription';
        setError(new Error(errorMessage));
        console.error('Error fetching subscription:', err);
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [session]);

  return {
    subscription,
    loading,
    error,
    canAnalyze: subscription ? canPerformAnalysis(subscription) : false,
    remainingAnalyses: subscription ? getRemainingAnalyses(subscription) : 0
  };
}