import { openai } from './config';
import { ANALYSIS_SYSTEM_PROMPT, createAnalysisPrompt } from './prompts';
import { parseAnalysisResponse } from './parser';
import { ApiError } from '../errors';
import type { Analysis } from '../../types/models';

export async function analyzeCV(cvText: string, jobDescription: string): Promise<Omit<Analysis, 'id' | 'candidate_id' | 'job_id' | 'created_at'>> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: ANALYSIS_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: createAnalysisPrompt(cvText, jobDescription)
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return parseAnalysisResponse(content);
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, 500);
    }
    throw new ApiError('Failed to analyze CV', 500);
  }
}