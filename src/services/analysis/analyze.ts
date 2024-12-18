import { supabase } from '../../lib/supabase';
import { analyzeWithGPT4 } from '../../lib/openai/client';
import { parseAnalysisResponse } from '../../lib/openai/parser';
import { handleError } from '../../lib/error-handling';
import { measurePerformance } from '../../lib/performance';
import type { Analysis } from '../../types/models';
import type { AnalysisInput } from './types';

export async function analyzeCandidateJob({
  candidateId,
  jobId
}: AnalysisInput): Promise<Analysis> {
  return measurePerformance(async () => {
    try {
      // Get candidate and job details
      const [candidateResult, jobResult] = await Promise.all([
        supabase.from('candidates').select('*').eq('id', candidateId).single(),
        supabase.from('jobs').select('*').eq('id', jobId).single()
      ]);

      if (candidateResult.error) throw new Error('Candidate not found');
      if (jobResult.error) throw new Error('Job not found');

      // Analyze using GPT-4
      const analysisResponse = await analyzeWithGPT4(
        candidateResult.data.cv_text,
        jobResult.data.jd_text
      );

      // Parse the response
      const analysis = parseAnalysisResponse(analysisResponse);

      // Save to database
      const { data, error } = await supabase
        .from('analysis')
        .insert([{
          candidate_id: candidateId,
          job_id: jobId,
          ...analysis,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw handleError(error);
    }
  }, 'analyze_candidate_job');
}