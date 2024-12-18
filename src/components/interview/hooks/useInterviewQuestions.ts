import { useQuery } from '../../../hooks/useQuery';
import { getInterviewQuestions } from '../../../services/interviewQuestions';
import type { InterviewQuestion } from '../../../types/models';

export function useInterviewQuestions(category?: InterviewQuestion['category']) {
  const {
    data: questions,
    isLoading,
    error,
    refetch
  } = useQuery(() => getInterviewQuestions(category));

  return {
    questions: questions || [],
    isLoading,
    error,
    refetch
  };
}