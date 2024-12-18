import { useQuery } from '../../../hooks/useQuery';
import { listAnalyses } from '../../../services';
import type { Analysis } from '../../../types/models';

export function useAnalysisHistory() {
  const {
    data: analyses,
    isLoading,
    error,
    refetch
  } = useQuery<Analysis[]>(listAnalyses);

  return {
    analyses: analyses || [],
    isLoading,
    error,
    refetch
  };
}