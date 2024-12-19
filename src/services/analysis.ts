import { analyzeWithGPT4 } from '../lib/openai/client';
import { parseAnalysisResponse } from '../lib/openai/parser';
import { ApiError } from '../lib/errors';
import type { Analysis } from '../types/models';
import { supabase } from '../lib/supabase';

export async function analyzeCandidateJob(
  candidateId: string,
  jobId: string
): Promise<Analysis> {
  try {
    // Get candidate and job details from your database
    const [candidateResult, jobResult] = await Promise.all([
      supabase.from('candidates').select('*').eq('id', candidateId).single(),
      supabase.from('jobs').select('*').eq('id', jobId).single()
    ]);

    if (candidateResult.error) throw new Error('Candidate not found');
    if (jobResult.error) throw new Error('Job not found');

    // Analyze using GPT-4
    const analysisResponse = await analyzeWithGPT4(
      candidateResult.data.cv_text,
      jobResult.data.description
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
    throw new ApiError('Analysis failed', 500);
  }
}