import { useQuery } from '../../../hooks/useQuery';
import { listJobs } from '../../../services/job';

export function useJobHistory() {
  const {
    data: jobs,
    isLoading,
    error,
    refetch
  } = useQuery(listJobs);

  return {
    jobs: jobs || [],
    isLoading,
    error,
    refetch
  };
}