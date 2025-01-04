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
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600'
    },
    {
      label: 'Candidates',
      value: stats.totalCandidates,
      icon: DocumentTextIcon,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600'
    },
    {
      label: 'Job Descriptions',
      value: stats.totalJobs,
      icon: BriefcaseIcon,
      color: 'from-violet-500 to-purple-600',
      textColor: 'text-violet-600'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat) => (
        <div 
          key={stat.label} 
          className="relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br opacity-5 from-gray-100 to-gray-200" />
          
          <div className="relative p-6">
            <div className={`bg-gradient-to-br ${stat.color} w-16 h-16 rounded-xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="h-8 w-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <p className={`text-4xl font-bold ${stat.textColor} tracking-tight transition-colors duration-300`}>
                {stat.value.toLocaleString()}
              </p>
              <p className="text-sm font-medium text-gray-600">
                {stat.label}
              </p>
            </div>

            <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-gradient-to-br ${stat.color} opacity-10 rounded-full transform rotate-45`} />
          </div>
        </div>
      ))}
    </div>
  );
}