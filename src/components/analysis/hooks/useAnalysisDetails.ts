import { useState } from 'react';
import { useQuery } from '../../../hooks/useQuery';
import { getAnalysis } from '../../../services';
import type { Analysis } from '../../../types/models';

export function useAnalysisDetails(analysisId: string) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    data: analysis,
    isLoading,
    error,
    refetch
  } = useQuery<Analysis>(() => getAnalysis(analysisId), {
    enabled: !!analysisId
  });

  return {
    analysis,
    isLoading,
    error,
    refetch,
    isExpanded,
    toggleExpanded: () => setIsExpanded(prev => !prev)
  };
}