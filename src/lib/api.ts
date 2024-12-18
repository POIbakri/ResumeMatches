import axios from 'axios';
import { supabase } from './supabase';
import type { Analysis, Candidate, Job } from '../types/models';

const API_URL = import.meta.env.VITE_API_URL;

export async function analyzeCandidateJob(candidateId: string, jobId: string) {
  try {
    const response = await axios.post(`${API_URL}/analyze`, {
      candidate_id: candidateId,
      job_id: jobId,
    });
    return response.data as Analysis;
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
}

export async function uploadCandidate(candidate: Omit<Candidate, 'id'>) {
  const { data, error } = await supabase
    .from('candidates')
    .insert([candidate])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function uploadJob(job: Omit<Job, 'id'>) {
  const { data, error } = await supabase
    .from('jobs')
    .insert([job])
    .select()
    .single();

  if (error) throw error;
  return data;
}