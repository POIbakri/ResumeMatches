import { useState } from 'react';
import { useToast } from '../../../hooks/useToast';
import { useLoading } from '../../../hooks/useLoading';
import { uploadCandidate, uploadJob, analyzeCandidateJob } from '../../../services';
import { ApiError } from '../../../lib/errors';
import type { Analysis } from '../../../types/models';
import { supabase } from '../../../lib/supabase';

interface AnalysisInput {
  candidateName: string;
  cvText: string;
  jobTitle: string;
  jobDescription: string;
}

export function useAnalysis() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, withLoading } = useLoading();
  const { addToast } = useToast();

  const analyze = async (input: AnalysisInput) => {
    try {
      // Check authentication first
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new ApiError('Not authenticated', 401);
      }

      console.log('Auth check:', {
        userId: session.user.id,
        isAuthenticated: true
      });

      // Step 1: Upload candidate
      const candidate = await uploadCandidate({
        name: input.candidateName,
        cv_text: input.cvText,
        created_at: new Date().toISOString(),
      });

      // Step 2: Upload job
      const job = await uploadJob(
        input.jobTitle,
        input.jobDescription
      );

      // Step 3: Analyze
      console.log('Starting analysis with:', {
        candidateId: candidate.id,
        jobId: job.id
      });

      const result = await analyzeCandidateJob({
        candidateId: candidate.id,
        jobId: job.id
      });

      console.log('Analysis completed:', result);
      setAnalysis(result);
      setError(null);
      addToast('Analysis completed successfully', 'success');
      return result;

    } catch (err: any) {
      console.error('Analysis error:', {
        error: err,
        type: err instanceof ApiError ? 'ApiError' : typeof err,
        message: err.message,
        status: err.status,
        details: err.details
      });

      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'An unexpected error occurred. Please try again.';

      setError(errorMessage);
      addToast(errorMessage, 'error');
      throw err;
    }
  };

  return {
    analysis,
    error,
    isLoading,
    analyze: (input: AnalysisInput) => withLoading(analyze(input))
  };
}