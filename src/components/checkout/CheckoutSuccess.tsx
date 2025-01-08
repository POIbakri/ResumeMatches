import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../hooks/useToast';

export function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleSuccess = async () => {
      const sessionId = searchParams.get('session_id');
      
      if (!sessionId) {
        addToast('Invalid checkout session', 'error');
        navigate('/pricing');
        return;
      }

      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('No authenticated user found');
        }

        // First check if subscription exists
        const { data: existingSub } = await supabase
          .from('subscriptions')
          .select()
          .eq('user_id', user.id)
          .single();

        let subscription;
        if (existingSub) {
          // Update existing subscription
          const { data: updatedSub, error: updateError } = await supabase
            .from('subscriptions')
            .update({
              stripe_subscription_id: sessionId,
              plan: 'pro',
              status: 'active',
              current_period_start: new Date().toISOString(),
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              cancel_at_period_end: false
            })
            .eq('user_id', user.id)
            .select()
            .single();

          if (updateError) throw updateError;
          subscription = updatedSub;
        } else {
          // Create new subscription
          const { data: newSub, error: insertError } = await supabase
            .from('subscriptions')
            .insert({
              user_id: user.id,
              stripe_subscription_id: sessionId,
              plan: 'pro',
              status: 'active',
              current_period_start: new Date().toISOString(),
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              cancel_at_period_end: false,
              analysis_count: 0
            })
            .select()
            .single();

          if (insertError) throw insertError;
          subscription = newSub;
        }

        // Update profile
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            c_subscription_id: subscription.id
          })
          .eq('user_id', user.id);

        if (profileError) throw profileError;

        addToast('Subscription activated successfully!', 'success');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error handling checkout success:', error);
        addToast('Failed to activate subscription', 'error');
        navigate('/pricing?error=true');
      } finally {
        setIsProcessing(false);
      }
    };

    handleSuccess();
  }, [searchParams, navigate, addToast]);

  if (!isProcessing) {
    return null;
  }

  return (
    <div className="text-center py-12">
      <h1 className="text-2xl font-bold mb-4">Processing your subscription...</h1>
      <p>Please wait while we set up your account.</p>
    </div>
  );
} 