import { supabase } from '../../lib/supabase';
import { ApiError } from '../../lib/errors';
import type { Analysis } from '../../types/models';

export async function getAnalysis(analysisId: string): Promise<Analysis> {
  const { data, error } = await supabase
    .from('analysis')
    .select('*')
    .eq('id', analysisId)
    .single();

  if (error) {
    throw new ApiError('Analysis not found', 404);
  }

  return data;
}

export async function listAnalyses(): Promise<Analysis[]> {
  const { data, error } = await supabase
    .from('analysis')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new ApiError('Failed to fetch analyses', 500);
  }

  return data || [];
}

export async function updateAnalysisNotes(analysisId: string, notes: string): Promise<void> {
  const { error } = await supabase
    .from('analysis')
    .update({ notes })
    .eq('id', analysisId);

  if (error) {
    throw new ApiError('Failed to update notes', 500);
  }
}