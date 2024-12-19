import { supabase } from '../lib/supabase';
import { ApiError } from '../lib/errors';
import type { Candidate } from '../types/models';

export async function uploadCandidate(candidate: Omit<Candidate, 'id'>): Promise<Candidate> {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData?.user?.id) {
    throw new ApiError('User must be authenticated to upload candidates', 401);
  }

  const candidateWithUserId = {
    ...candidate,
    user_id: userData.user.id
  };

  const { data, error } = await supabase
    .from('candidates')
    .insert([candidateWithUserId])
    .select('id, name, cv_text, created_at')
    .single();

  if (error) {
    if (error.code === '23505') { // Unique constraint violation
      throw new ApiError('A candidate with this name already exists', 400);
    }
    throw new ApiError(`Failed to upload candidate: ${error.message}`, 500);
  }

  if (!data) {
    throw new ApiError('No data returned after candidate upload', 500);
  }

  return data;
}

export async function listCandidates(): Promise<Candidate[]> {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData?.user?.id) {
    throw new ApiError('User must be authenticated to list candidates', 401);
  }

  const { data, error } = await supabase
    .from('candidates')
    .select('id, name, cv_text, created_at')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new ApiError(`Failed to fetch candidates: ${error.message}`, 500);
  }

  return data || [];
}