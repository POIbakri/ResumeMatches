import { User } from '@supabase/supabase-js';
import { UserCircleIcon, BellIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import { createCheckoutSession } from '../../services/pricing/checkout';
import { supabase } from '../../lib/supabase';

interface DashboardHeaderProps {
  user?: User | null;
  subscription?: {
    plan: string;
    status: string;
    stripeSubscriptionId?: string;
  };
  onSubscriptionUpdate?: () => void;
}

export function DashboardHeader({ user, subscription, onSubscriptionUpdate }: DashboardHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUpgrade = async () => {
    try {
      setIsLoading(true);
      if (!user?.id) throw new Error('User ID is required');
      await createCheckoutSession(user.id, 'pro');
    } catch (error) {
      console.error('Error upgrading:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.functions.invoke('cancel-subscription', {
        body: { subscriptionId: subscription?.stripeSubscriptionId }
      });
      
      if (error) throw error;
      
      if (onSubscriptionUpdate) {
        onSubscriptionUpdate();
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    } finally {
      setIsLoading(false);
      setIsProfileOpen(false);
    }
  };

  const userName = user?.email?.split('@')[0];
  const userEmail = user?.email;

  if (!user) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div className="text-white">
          <h1 className="text-3xl font-bold">
            Welcome back, {userName}! 👋
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
              {user.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  className="h-10 w-10 rounded-lg shadow-sm"
                />
              ) : (
                <UserCircleIcon className="h-10 w-10 text-blue-100" />
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{userEmail}</p>
                <p className="text-xs text-blue-100">View Profile</p>
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1" role="menu">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    Current Plan: <span className="font-semibold capitalize">{subscription?.plan || 'Free'}</span>
                  </div>
                  
                  {(!subscription || subscription?.plan === 'free') && (
                    <button
                      onClick={handleUpgrade}
                      disabled={isLoading}
                      className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      role="menuitem"
                    >
                      {isLoading ? 'Processing...' : 'Upgrade to Pro'}
                    </button>
                  )}

                  {subscription?.plan === 'pro' && (
                    <button
                      onClick={handleCancelSubscription}
                      disabled={isLoading}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      role="menuitem"
                    >
                      {isLoading ? 'Processing...' : 'Cancel Subscription'}
                    </button>
                  )}

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