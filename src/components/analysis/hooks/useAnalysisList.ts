import { useQuery } from '../../../hooks/useQuery';
import { listAnalyses } from '../../../services';
import type { Analysis } from '../../../types/models';

interface UseAnalysisListProps {
  filter?: 'all' | 'recent';
}

export function useAnalysisList({ filter = 'all' }: UseAnalysisListProps = {}) {
  const {
    data: analyses,
    isLoading,
    error,
    refetch
  } = useQuery<Analysis[]>(listAnalyses);

  const filteredAnalyses = analyses?.filter(analysis => {
    if (filter === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(analysis.created_at ?? '') >= oneWeekAgo;
    }
    return true;
  });

  return {
    analyses: filteredAnalyses || [],
    isLoading,
    error,
    refetch
  };
}