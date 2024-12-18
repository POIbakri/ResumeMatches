import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!STRIPE_PUBLIC_KEY) {
  throw new Error('Missing Stripe public key');
}

export const stripe = loadStripe(STRIPE_PUBLIC_KEY);

export const SUBSCRIPTION_PRICES = {
  PRO: 'price_1234567890', // Replace with your actual Stripe price ID
};

export const MAX_FREE_ANALYSES = 4;