import { useState } from 'react';
import { useToast } from '../../../hooks/useToast';
import { useLoading } from '../../../hooks/useLoading';
import { uploadCandidate, uploadJob, analyzeCandidateJob } from '../../../services';
import type { Analysis } from '../../../types/models';

interface AnalysisInput {
  candidateName: string;
  cvText: string;
  jobTitle: string;
  jobDescription: string;
}

export function useAnalysis() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const { isLoading, withLoading } = useLoading();
  const { addToast } = useToast();

  const analyze = async (input: AnalysisInput) => {
    try {
      const candidate = await uploadCandidate({
        name: input.candidateName,
        cv_text: input.cvText,
        created_at: new Date().toISOString(),
      });

      const job = await uploadJob({
        title: input.jobTitle,
        jd_text: input.jobDescription,
        created_at: new Date().toISOString(),
      });

      const result = await analyzeCandidateJob(candidate.id, job.id);
      setAnalysis(result);
      addToast('Analysis completed successfully', 'success');
      return result;
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Failed to analyze', 'error');
      throw error;
    }
  };

  return {
    analysis,
    isLoading,
    analyze: (input: AnalysisInput) => withLoading(analyze(input))
  };
}