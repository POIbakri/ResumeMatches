import { loadStripe } from '@stripe/stripe-js';
import type { PlanId } from '../../config/pricing/types';
import { SUBSCRIPTION_PRICES } from '../../lib/stripe';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error('Missing Stripe public key');
}

const stripePromise = loadStripe(stripePublicKey);

export async function createCheckoutSession(userId: string, planId: PlanId) {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    // Only proceed with checkout for paid plans
    if (planId === 'free') {
      throw new Error('Cannot create checkout session for free plan');
    }

    const priceId = planId === 'pro' ? SUBSCRIPTION_PRICES.PRO : null;
    if (!priceId) {
      throw new Error('Invalid plan selected');
    }

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: priceId,
        quantity: 1
      }],
      mode: 'subscription',
      successUrl: `${window.location.origin}/dashboard?success=true`,
      cancelUrl: `${window.location.origin}/pricing?canceled=true`,
      clientReferenceId: userId,
      customerEmail: undefined, // Will be populated by Stripe based on the logged-in user
    });

    if (error) {
      console.error('Stripe checkout error:', error);
      throw new Error(error.message || 'Failed to start checkout process');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    throw new Error('Failed to start checkout process');
  }
}