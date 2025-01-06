import { loadStripe, Stripe } from '@stripe/stripe-js';
import type { PlanId } from '../../config/pricing/types';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error('Missing Stripe public key');
}

const stripePromise = loadStripe(stripePublicKey);

export async function createCheckoutSession(userId: string, planId: PlanId) {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      userId,
      planId,
      metadata: {
        planId: planId
      },
      clientReferenceId: userId
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  const session = await response.json();
  
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const result = await stripe.redirectToCheckout({
    sessionId: session.id
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
}