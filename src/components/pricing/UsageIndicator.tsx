import React from 'react';
import { useSubscription } from '../../hooks/pricing/useSubscription';
import { getUsageStats } from '../../services/pricing/usage';

export function UsageIndicator() {
  const { subscription } = useSubscription();
  
  if (!subscription) return null;
  
  const stats = getUsageStats(subscription);
  const barColor = stats.isCritical ? 'bg-red-600' : 
                  stats.isWarning ? 'bg-yellow-500' : 
                  'bg-green-600';

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">
          {stats.used} / {stats.limit} analyses used
        </span>
        <span className="text-gray-600">
          {stats.remaining} remaining
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${barColor} transition-all duration-500`}
          style={{ width: `${Math.min(100, stats.usagePercentage)}%` }}
        />
      </div>
      {(stats.isWarning || stats.isCritical) && (
        <p className={`text-sm ${stats.isCritical ? 'text-red-600' : 'text-yellow-600'}`}>
          {stats.isCritical ? 
            'You\'re almost out of analyses. Upgrade to continue analyzing.' :
            'You\'re approaching your analysis limit. Consider upgrading soon.'}
        </p>
      )}
    </div>
  );
}