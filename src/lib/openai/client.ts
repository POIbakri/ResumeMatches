import OpenAI from 'openai';
import { OPENAI_MODELS, MODEL_CONFIGS, DEFAULT_MODEL } from '../../config/openai/models';
import { SYSTEM_PROMPTS } from '../../config/openai/prompts';
import { ApiError } from '../errors';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key');
}

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo purposes
});

export async function analyzeWithGPT4(
  cvText: string, 
  jobDescription: string, 
  model = DEFAULT_MODEL
) {
  try {
    const modelConfig = MODEL_CONFIGS[model];

    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPTS.CV_ANALYSIS
        },
        {
          role: 'user',
          content: `CV:\n${cvText}\n\nJob Description:\n${jobDescription}`
        }
      ],
      ...modelConfig
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return content;
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, 500);
    }
    throw new ApiError('Failed to analyze CV', 500);
  }
}