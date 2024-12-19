import { supabase } from '../lib/supabase';
import type { Job } from '../types/models';

export async function uploadJob(title: string, description: string, company: string = ''): Promise<Job> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('jobs')
      .insert([{
        title,
        jd_text: description,
        company,
        user_id: user.id
      }])
      .select()
      .single();

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Upload job error:', error);
    throw new Error(`Failed to upload job: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function listJobs(): Promise<Job[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('jobs')
      .select('id, title, jd_text, company, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Get jobs error:', error);
    throw new Error('Failed to fetch jobs');
  }
}