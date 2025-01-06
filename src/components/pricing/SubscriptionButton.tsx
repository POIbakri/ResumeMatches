import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCheckoutSession } from '../../services/pricing/checkout';
import { Button } from '../form/Button';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

interface SubscriptionButtonProps {
  plan: 'free' | 'pro';
}

export function SubscriptionButton({ plan }: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!session) {
      navigate('/login');
      return;
    }

    if (plan === 'free') {
      navigate('/dashboard');
      return;
    }

    setIsLoading(true);
    try {
      await createCheckoutSession(session.user.id, plan);
    } catch (err) {
      addToast('Failed to start subscription process', 'error');
      console.error('Subscription error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      isLoading={isLoading}
      variant={plan === 'pro' ? 'primary' : 'secondary'}
      className="w-full"
    >
      {plan === 'free' ? 'Start Free Trial' : 'Subscribe Now'}
    </Button>
  );
}