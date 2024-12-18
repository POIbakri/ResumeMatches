import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '../../config/pricing/stripe';
import type { PlanId } from '../../config/pricing/types';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePublicKey && !STRIPE_CONFIG.MOCK_MODE) {
  throw new Error('Missing Stripe public key');
}

export const stripe = loadStripe(stripePublicKey || 'pk_test_mock');

export async function createCheckoutSession(userId: string, planId: PlanId) {
  if (STRIPE_CONFIG.MOCK_MODE) {
    return {
      id: `mock_session_${Date.now()}`,
      url: '#mock-checkout'
    };
  }

  // Implement real Stripe checkout here
  throw new Error('Real checkout not implemented');
}