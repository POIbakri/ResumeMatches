import { createClient } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import type { AnalysisPrompt, ParsedAnalysis } from './types';

interface CacheEntry {
  id: string;
  prompt_hash: string;
  response: ParsedAnalysis;
  created_at: string;
  expires_at: string;
}

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function createPromptHash(prompt: AnalysisPrompt): string {
  const str = `${prompt.cvText}:${prompt.jobDescription}`;
  return btoa(str).slice(0, 32); // Simple hash for demo
}

export async function getCachedAnalysis(prompt: AnalysisPrompt): Promise<ParsedAnalysis | null> {
  const promptHash = createPromptHash(prompt);
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('analysis_cache')
    .select<'*', CacheEntry>('*')
    .eq('prompt_hash', promptHash)
    .gt('expires_at', now)
    .single();

  if (error || !data) return null;
  return data.response;
}

export async function cacheAnalysis(prompt: AnalysisPrompt, response: ParsedAnalysis): Promise<void> {
  const promptHash = createPromptHash(prompt);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + CACHE_TTL);

  const supabaseClient = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
  );

  const { error } = await supabaseClient
    .from('analysis_cache')
    .insert<CacheEntry>([{
      id: crypto.randomUUID(),
      prompt_hash: promptHash,
      response,
      created_at: now.toISOString(),
      expires_at: expiresAt.toISOString()
    }]);

  if (error) {
    console.error('Failed to cache analysis:', error);
  }
}