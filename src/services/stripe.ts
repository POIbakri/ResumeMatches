import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error('Missing Stripe public key');
}

export const stripe = loadStripe(stripePublicKey);

export async function createCheckoutSession(userId: string, priceId: string) {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, priceId }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  const session = await response.json();
  return {
    id: session.id,
    url: session.url
  };
}

export async function getSubscriptionStatus(userId: string) {
  const response = await fetch(`/api/subscription-status/${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to get subscription status');
  }

  const subscription = await response.json();
  return {
    status: subscription.status,
    plan: subscription.plan,
    analysisCount: subscription.analysisCount
  };
}