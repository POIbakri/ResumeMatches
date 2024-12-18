import { useQuery } from '../../../hooks/useQuery';
import { getDashboardStats } from '../../../services/dashboard';

export function useDashboardStats() {
  const {
    data: stats,
    isLoading,
    error,
    refetch
  } = useQuery(getDashboardStats);

  return {
    stats: stats || {
      totalAnalyses: 0,
      totalCandidates: 0,
      totalJobs: 0,
      recentAnalyses: 0
    },
    isLoading,
    error,
    refetch
  };
}