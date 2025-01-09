import { User } from '@supabase/supabase-js';
import { UserCircleIcon, BellIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useSubscription } from '../../hooks/useSubscription';
import { MAX_FREE_ANALYSES } from '../../lib/stripe';

export function DashboardHeader({ user }: { user: User | null }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { subscription } = useSubscription();

  const handleCancelSubscription = async () => {
    try {
      setIsLoading(true);
      
      // Update subscription status in database
      const { error } = await supabase
        .from('subscriptions')
        .update({
          status: 'canceled',
          cancelAtPeriodEnd: true,
          currentPeriodEnd: new Date().toISOString()
        })
        .eq('user_id', user?.id);

      if (error) throw error;
      
      navigate('/pricing');
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    } finally {
      setIsLoading(false);
      setIsProfileOpen(false);
    }
  };

  const isSubscriptionActive = subscription?.status === 'active';
  const hasReachedLimit = (subscription?.analysisCount ?? 0) >= MAX_FREE_ANALYSES;
  const showUpgradeButton = !isSubscriptionActive || hasReachedLimit || subscription?.plan === 'free';

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div className="text-white">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="mt-2 text-blue-100 font-medium">
            Here's your recruitment analysis overview
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <button 
            className="relative p-2 text-blue-100 hover:text-white transition-colors duration-200"
            aria-label="Notifications"
          >
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-blue-600" />
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center bg-white/10 rounded-lg p-2 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
            >
              {user?.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  className="h-10 w-10 rounded-lg shadow-sm"
                />
              ) : (
                <UserCircleIcon className="h-10 w-10 text-blue-100" />
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.email}</p>
                <p className="text-xs text-blue-100">View Profile</p>
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1" role="menu">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    Current Plan: <span className="font-semibold capitalize">{subscription?.plan || 'Free'}</span>
                    {subscription?.cancelAtPeriodEnd && (
                      <p className="text-xs text-red-500">Cancels at end of period</p>
                    )}
                  </div>
                  
                  {showUpgradeButton && (
                    <button
                      onClick={() => navigate('/pricing')}
                      className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Upgrade to Pro
                    </button>
                  )}

                  {isSubscriptionActive && subscription?.plan === 'pro' && (
                    <button
                      onClick={handleCancelSubscription}
                      disabled={isLoading}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50"
                      role="menuitem"
                    >
                      {isLoading ? 'Processing...' : 'Cancel Subscription'}
                    </button>
                  )}

                  <div className="px-4 py-2 text-xs text-gray-500 border-t">
                    {subscription?.plan === 'free' ? (
                      `${subscription.analysisCount || 0}/${MAX_FREE_ANALYSES} analyses used`
                    ) : (
                      `${subscription?.analysisCount || 0} analyses used`
                    )}
                  </div>

                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}