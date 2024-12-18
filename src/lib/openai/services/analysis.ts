import { openai } from '../config';
import { MODELS, MAX_TOKENS, TEMPERATURE } from '../constants';
import { ANALYSIS_SYSTEM_PROMPT, ANALYSIS_USER_PROMPT } from '../prompts';
import { parseAnalysisResponse } from '../parser';
import { ApiError } from '../../errors';
import type { AnalysisPrompt } from '../types';

export async function analyzeCV({ cvText, jobDescription }: AnalysisPrompt) {
  try {
    const response = await openai.chat.completions.create({
      model: MODELS.GPT_3_5_TURBO,
      messages: [
        {
          role: 'system',
          content: ANALYSIS_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: ANALYSIS_USER_PROMPT(cvText, jobDescription)
        }
      ],
      temperature: TEMPERATURE.BALANCED,
      max_tokens: MAX_TOKENS.ANALYSIS
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