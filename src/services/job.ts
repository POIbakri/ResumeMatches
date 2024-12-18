import { supabase } from '../lib/supabase';
import { ApiError } from '../lib/errors';
import type { Job } from '../types/models';

export async function uploadJob(job: Omit<Job, 'id'>): Promise<Job> {
  const { data, error } = await supabase
    .from('jobs')
    .insert([job])
    .select()
    .single();

  if (error) {
    throw new ApiError('Failed to upload job', 500, error.code);
  }

  return data;
}

export async function listJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new ApiError('Failed to fetch jobs', 500);
  }

  return data || [];
}