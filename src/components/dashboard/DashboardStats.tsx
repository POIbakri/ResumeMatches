import React from 'react';
import { useDashboardStats } from './hooks/useDashboardStats';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import {
  DocumentTextIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export function DashboardStats() {
  const { stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Analyses',
      value: stats.totalAnalyses,
      icon: ChartBarIcon,
      color: 'bg-blue-500'
    },
    {
      label: 'Candidates',
      value: stats.totalCandidates,
      icon: DocumentTextIcon,
      color: 'bg-green-500'
    },
    {
      label: 'Jobs',
      value: stats.totalJobs,
      icon: BriefcaseIcon,
      color: 'bg-purple-500'
    },
    {
      label: 'Recent Analyses',
      value: stats.recentAnalyses,
      icon: ClockIcon,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}