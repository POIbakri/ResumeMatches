import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getSubscriptionStatus } from '../services/stripe';
import { STRIPE_CONFIG } from '../config/stripe';
import type { Subscription, SubscriptionHook } from '../types/subscription';

export function useSubscription(): SubscriptionHook {
  const { session } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
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

  const canAnalyze = (): boolean => {
    if (!subscription) return false;
    if (subscription.plan === 'pro') return true;
    return subscription.analysisCount < STRIPE_CONFIG.MAX_FREE_ANALYSES;
  };

  const remainingAnalyses = (): number => {
    if (!subscription) return 0;
    if (subscription.plan === 'pro') return Infinity;
    return Math.max(0, STRIPE_CONFIG.MAX_FREE_ANALYSES - subscription.analysisCount);
  };

  return {
    subscription,
    loading,
    canAnalyze,
    remainingAnalyses
  };
}