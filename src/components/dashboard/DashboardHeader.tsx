import { User } from '@supabase/supabase-js';
import { UserCircleIcon, BellIcon } from '@heroicons/react/24/outline';

interface DashboardHeaderProps {
  user?: User | null;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.email?.split('@')[0] || 'Demo User'}!
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your recruitment analysis
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          </button>
          <div className="flex items-center">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.email || 'demo@example.com'}</p>
              <p className="text-xs text-gray-500">Recruiter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}