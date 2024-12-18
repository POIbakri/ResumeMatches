import { supabase } from '../lib/supabase';
import { ApiError } from '../lib/errors';
import type { InterviewQuestion } from '../types/models';

export async function saveInterviewQuestion(question: Omit<InterviewQuestion, 'id' | 'created_at' | 'times_used'>): Promise<InterviewQuestion> {
  const { data, error } = await supabase
    .from('interview_questions')
    .insert([{
      ...question,
      created_at: new Date().toISOString(),
      times_used: 0
    }])
    .select()
    .single();

  if (error) {
    throw new ApiError('Failed to save interview question', 500);
  }

  return data;
}

export async function getInterviewQuestions(category?: InterviewQuestion['category']): Promise<InterviewQuestion[]> {
  let query = supabase
    .from('interview_questions')
    .select('*')
    .order('times_used', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    throw new ApiError('Failed to fetch interview questions', 500);
  }

  return data || [];
}

export async function updateQuestionUsage(questionId: string): Promise<void> {
  const { error } = await supabase
    .from('interview_questions')
    .update({ times_used: supabase.rpc('increment') })
    .eq('id', questionId);

  if (error) {
    throw new ApiError('Failed to update question usage', 500);
  }
}