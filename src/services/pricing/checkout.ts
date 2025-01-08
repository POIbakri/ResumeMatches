import { stripe, SUBSCRIPTION_PRICES } from '../../lib/stripe';
import type { PlanId } from '../../config/pricing/types';

export async function createCheckoutSession(userId: string, planId: PlanId) {
  try {
    const stripeInstance = await stripe;
    if (!stripeInstance) {
      throw new Error('Stripe failed to load');
    }

    // Get the correct price ID based on plan
    const priceId = planId === 'pro' ? SUBSCRIPTION_PRICES.PRO : null;
    if (!priceId) {
      throw new Error('Invalid plan selected');
    }

    // Create checkout session
    const result = await stripeInstance.redirectToCheckout({
      mode: 'subscription',
      lineItems: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/pricing?canceled=true`,
      clientReferenceId: userId,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
}