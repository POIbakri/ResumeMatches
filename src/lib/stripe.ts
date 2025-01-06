import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!STRIPE_PUBLIC_KEY) {
  throw new Error('Missing Stripe public key');
}

export const stripe = loadStripe(STRIPE_PUBLIC_KEY);

export const SUBSCRIPTION_PRICES = {
  // PRO: 'price_1QeA8NDCDYG5RrkYDlGDFzVF', 
  PRO: 'price_1QeARbDCDYG5RrkY6kSqLkmL', 
};

export const MAX_FREE_ANALYSES = 4;