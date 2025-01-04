import { User } from '@supabase/supabase-js';
import { UserCircleIcon, BellIcon } from '@heroicons/react/24/outline';

interface DashboardHeaderProps {
  user?: User | null;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
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
          <div className="flex items-center bg-white/10 rounded-lg p-2 backdrop-blur-sm">
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
          </div>
        </div>
      </div>
    </div>
  );
}