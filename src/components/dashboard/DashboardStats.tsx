import { useDashboardStats } from './hooks/useDashboardStats';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import {
  DocumentTextIcon,
  BriefcaseIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

export function DashboardStats() {
  const { stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Analyses',
      value: stats.totalAnalyses,
      icon: ChartBarIcon,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-blue-600'
    },
    {
      label: 'Candidates',
      value: stats.totalCandidates,
      icon: DocumentTextIcon,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      textColor: 'text-green-600'
    },
    {
      label: 'Job Descriptions',
      value: stats.totalJobs,
      icon: BriefcaseIcon,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      textColor: 'text-purple-600'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {statCards.map((stat) => (
        <div 
          key={stat.label} 
          className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] bg-[length:24px_24px]"></div>
          
          <div className="relative p-6">
            {/* Icon */}
            <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="h-7 w-7 text-white" />
            </div>
            
            {/* Content */}
            <div className="space-y-2">
              <p className={`text-4xl font-bold ${stat.textColor} tracking-tight transition-colors duration-300`}>
                {stat.value.toLocaleString()}
              </p>
              <p className="text-sm font-medium text-gray-600">
                {stat.label}
              </p>
            </div>

            {/* Decorative corner accent */}
            <div className={`absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 ${stat.color} opacity-10 rounded-full transform rotate-45`}></div>
          </div>
        </div>
      ))}
    </div>
  );
}