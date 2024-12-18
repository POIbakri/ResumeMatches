import { useQuery } from '../../../hooks/useQuery';
import { listCandidates } from '../../../services/candidate';

export function useCandidateHistory() {
  const {
    data: candidates,
    isLoading,
    error,
    refetch
  } = useQuery(listCandidates);

  return {
    candidates: candidates || [],
    isLoading,
    error,
    refetch
  };
}