import { Stripe } from 'stripe';
import { createSubscription, updateSubscriptionStatus } from '../stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia'
});

export async function handleStripeWebhook(event: Stripe.Event) {
  try {
    console.log('Webhook event received:', event.type);

    // When checkout is completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Checkout session:', session);

      if (!session.client_reference_id || !session.customer || !session.subscription) {
        throw new Error(`Missing required session data: 
          client_reference_id: ${session.client_reference_id}, 
          customer: ${session.customer}, 
          subscription: ${session.subscription}`);
      }

      // Get subscription details
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      console.log('Subscription details:', subscription);

      // Insert into subscriptions table
      await createSubscription(
        session.client_reference_id,
        session.customer as string,
        session.subscription as string,
        subscription.items.data[0].price.lookup_key || subscription.items.data[0].price.id,
        new Date(subscription.current_period_start * 1000).toISOString(),
        new Date(subscription.current_period_end * 1000).toISOString()
      );

      console.log('Subscription created successfully');
    }

    // When subscription is updated
    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription updated:', subscription);
      
      await updateSubscriptionStatus(
        subscription.id,
        subscription.status,
        new Date(subscription.current_period_start * 1000).toISOString(),
        new Date(subscription.current_period_end * 1000).toISOString(),
        subscription.cancel_at_period_end
      );

      console.log('Subscription updated successfully');
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    throw error;
  }
}

export function verifyStripeWebhook(payload: string | Buffer, signature: string): Stripe.Event {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('Missing Stripe webhook secret');
  }

  try {
    return stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    throw err;
  }
} 