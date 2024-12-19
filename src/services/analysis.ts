import { analyzeWithGPT4 } from '../lib/openai/client';
import { parseAnalysisResponse } from '../lib/openai/parser';
import { ApiError } from '../lib/errors';
import type { Analysis } from '../types/models';
import { supabase } from '../lib/supabase';

export async function analyzeCandidateJob(
  candidateId: string,
  jobId: string,
  userId: string
): Promise<Analysis> {
  try {
    // Input validation
    if (!candidateId || !jobId || !userId) {
      throw new ApiError('Missing required parameters', 400);
    }

    // Get candidate and job details from your database
    const [candidateResult, jobResult] = await Promise.all([
      supabase.from('candidates').select('*').eq('id', candidateId).single(),
      supabase.from('jobs').select('*').eq('id', jobId).single()
    ]).catch(error => {
      throw new ApiError(`Database query failed: ${error.message}`, 500);
    });

    if (candidateResult.error) {
      throw new ApiError(`Candidate not found: ${candidateResult.error.message}`, 404);
    }
    if (jobResult.error) {
      throw new ApiError(`Job not found: ${jobResult.error.message}`, 404);
    }

    if (!candidateResult.data?.cv_text) {
      throw new ApiError('CV text is missing from candidate data', 400);
    }
    if (!jobResult.data?.jd_text) {
      throw new ApiError('Job description text is missing from job data', 400);
    }

    // Analyze using GPT-4
    let analysisResponse;
    try {
      analysisResponse = await analyzeWithGPT4(
        candidateResult.data.cv_text,
        jobResult.data.jd_text
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to analyze CV with AI service: ${error instanceof Error ? error.message : 'Unknown error'}`, 500);
    }

    if (!analysisResponse) {
      throw new ApiError('AI service returned empty response', 500);
    }

    // Parse the response
    let analysis;
    try {
      analysis = parseAnalysisResponse(analysisResponse);
    } catch (error) {
      throw new ApiError(`Failed to parse AI response: ${error instanceof Error ? error.message : 'Invalid format'}`, 500);
    }

    // Validate required fields based on API schema
    const requiredFields = [
      'fit_score',
      'verdict',
      'reasoning',
      'interview_plan'
    ] as const;

    type RequiredField = typeof requiredFields[number];
    const missingFields = requiredFields.filter((field: RequiredField) => {
      const value = analysis[field];
      return value === undefined || value === null || value === '';
    });
    
    if (missingFields.length > 0) {
      throw new ApiError(`Missing or invalid required fields: ${missingFields.join(', ')}`, 400);
    }

    // Validate data types and ranges
    if (typeof analysis.fit_score !== 'number' || analysis.fit_score < 0 || analysis.fit_score > 100) {
      throw new ApiError('Invalid fit_score: must be a number between 0 and 100', 400);
    }

    // Validate arrays and JSONB fields
    if (!Array.isArray(analysis.reasoning)) {
      throw new ApiError('Reasoning must be an array', 400);
    }

    if (analysis.risk_factors && !Array.isArray(analysis.risk_factors)) {
      throw new ApiError('Risk factors must be an array', 400);
    }

    if (analysis.technical_skills && typeof analysis.technical_skills !== 'object') {
      throw new ApiError('Technical skills must be a valid JSONB object', 400);
    }

    if (analysis.growth_potential && typeof analysis.growth_potential !== 'object') {
      throw new ApiError('Growth potential must be a valid JSONB object', 400);
    }

    // Save to database with explicit column selection and proper types
    const { data, error } = await supabase
      .from('analysis')
      .insert([{
        user_id: userId,
        candidate_id: candidateId,
        job_id: jobId,
        fit_score: Math.round(analysis.fit_score), // Convert to integer
        verdict: analysis.verdict,
        reasoning: analysis.reasoning,
        technical_skills: analysis.technical_skills || null,
        risk_factors: Array.isArray(analysis.risk_factors) ? analysis.risk_factors : [],
        growth_potential: analysis.growth_potential || null,
        interview_plan: analysis.interview_plan,
        notes: null,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      throw new ApiError(`Failed to save analysis results: ${error.message}`, 500);
    }

    if (!data) {
      throw new ApiError('No analysis data returned from database', 500);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Log the unexpected error for debugging
    console.error('Unexpected error in analyzeCandidateJob:', error);
    throw new ApiError(
      'An unexpected error occurred while analyzing the candidate job match. Please try again.',
      500
    );
  }
}

export async function getAnalyses() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new ApiError('Not authenticated', 401);
    }

    const { data, error } = await supabase
      .from('analysis')
      .select(`
        id,
        user_id,
        candidate_id,
        job_id,
        fit_score,
        verdict,
        reasoning,
        technical_skills,
        risk_factors,
        growth_potential,
        interview_plan,
        notes,
        created_at,
        updated_at
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get analyses error:', error);
      throw new ApiError(`Failed to fetch analyses: ${error.message}`, 500);
    }

    return data;
  } catch (error) {
    console.error('Get analyses error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to fetch analyses', 500);
  }
}

export async function getAnalysisById(id: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new ApiError('Not authenticated', 401);
    }

    const { data, error } = await supabase
      .from('analysis')
      .select(`
        id,
        user_id,
        candidate_id,
        job_id,
        fit_score,
        verdict,
        reasoning,
        technical_skills,
        risk_factors,
        growth_potential,
        interview_plan,
        notes,
        created_at,
        updated_at
      `)
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Get analysis error:', error);
      throw new ApiError(`Failed to fetch analysis: ${error.message}`, 500);
    }

    return data;
  } catch (error) {
    console.error('Get analysis error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to fetch analysis', 500);
  }
}

export async function testAnalysisConnection() {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Not authenticated');
    }

    // Make the simplest possible query
    const { data, error } = await supabase
      .from('analysis')
      .select('id')
      .limit(1);

    console.log('Test query result:', { data, error });

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Test connection error:', error);
    throw error;
  }
}

export async function getAnalysis(candidateId: string, jobId: string) {
  try {
    // Get current user and session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new ApiError('Not authenticated', 401);
    }

    // Log authentication details for debugging
    console.log('Auth check:', {
      isAuthenticated: !!session,
      userId: session.user.id,
      accessToken: !!session.access_token
    });

    // Add auth header explicitly
    const { data, error } = await supabase
      .from('analysis')
      .select(`
        id,
        user_id,
        candidate_id,
        job_id,
        fit_score,
        verdict,
        reasoning,
        technical_skills,
        risk_factors,
        growth_potential,
        interview_plan,
        cv_summary,
        job_requirements,
        questions_used,
        suggestions,
        status,
        interview_date,
        interviewer_feedback,
        created_at
      `)
      .eq('candidate_id', candidateId)
      .eq('job_id', jobId)
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      // Log detailed error for debugging
      console.error('Analysis query error:', {
        error,
        status: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      
      if (error.code === '42501') { // Permission denied
        throw new ApiError('Permission denied. Please check your access rights.', 403);
      }
      
      throw new ApiError(`Failed to fetch analysis: ${error.message}`, 500);
    }

    if (!data) {
      throw new ApiError('Analysis not found', 404);
    }

    return data;
  } catch (error) {
    console.error('Get analysis error:', {
      error,
      type: error instanceof Error ? error.constructor.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error'
    });

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError('Failed to fetch analysis', 500);
  }
}

// Helper function to check auth status
export async function checkAuthStatus() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Auth check error:', error);
    return false;
  }

  return {
    isAuthenticated: !!session,
    userId: session?.user?.id,
    email: session?.user?.email
  };
}