import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '../config/stripe';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  console.warn('Missing Stripe public key - using mock implementation');
}

export const stripe = loadStripe(stripePublicKey || 'pk_test_mock');

export async function createCheckoutSession(userId: string, priceId: string) {
  // Mock implementation for development
  console.log('Creating mock checkout session for:', { userId, priceId });
  return {
    id: 'mock_checkout_session_' + Date.now(),
    url: 'https://mock-checkout.stripe.com'
  };
}

export async function getSubscriptionStatus(userId: string) {
  // Mock implementation for development
  return {
    status: 'active',
    plan: 'free',
    analysisCount: 0
  };
}