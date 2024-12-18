import { supabase } from '../lib/supabase';
import { ApiError } from '../lib/errors';
import type { Candidate } from '../types/models';

export async function uploadCandidate(candidate: Omit<Candidate, 'id'>): Promise<Candidate> {
  const { data, error } = await supabase
    .from('candidates')
    .insert([candidate])
    .select()
    .single();

  if (error) {
    throw new ApiError('Failed to upload candidate', 500);
  }

  return data;
}

export async function listCandidates(): Promise<Candidate[]> {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new ApiError('Failed to fetch candidates', 500);
  }

  return data || [];
}