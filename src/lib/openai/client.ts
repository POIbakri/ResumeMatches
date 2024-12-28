import OpenAI from 'openai';
import { OPENAI_MODELS, MODEL_CONFIGS } from '../../config/openai/models';
import { ANALYSIS_SYSTEM_PROMPT } from './prompts';
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
  model: keyof typeof MODEL_CONFIGS = "gpt-4o-mini" as keyof typeof MODEL_CONFIGS
) {
  // Input validation
  if (!cvText?.trim()) {
    throw new ApiError('CV text is required', 400);
  }

  if (!jobDescription?.trim()) {
    throw new ApiError('Job description is required', 400);
  }

  // Model validation
  if (!Object.values(OPENAI_MODELS).includes(model)) {
    throw new ApiError(
      `Invalid model. Must be one of: ${Object.values(OPENAI_MODELS).join(', ')}`,
      400
    );
  }

  try {
    const modelConfig = MODEL_CONFIGS[model];

    // Validate token limits
    const totalInputLength = cvText.length + jobDescription.length;
    if (totalInputLength > modelConfig.maxTokens * 4) { // Rough char to token ratio
      throw new ApiError('Input text is too long for the selected model', 400);
    }

    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: ANALYSIS_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: `CV:\n${cvText}\n\nJob Description:\n${jobDescription}`
        }
      ],
      temperature: modelConfig.temperature,
      presence_penalty: modelConfig.presencePenalty,
      frequency_penalty: modelConfig.frequencyPenalty,
      max_tokens: modelConfig.maxTokens
    });

    if (!response?.choices?.length) {
      throw new ApiError('Invalid response from OpenAI', 500);
    }

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new ApiError('Empty response from OpenAI', 500);
    }

    return content;

  } catch (error) {
    if (error instanceof ApiError) {
      throw error; // Re-throw our custom API errors
    }

    if (error instanceof OpenAI.APIError) {
      // Handle specific OpenAI error types
      switch (error.status) {
        case 400:
          throw new ApiError('Invalid request to OpenAI API: ' + error.message, 400);
        case 401:
          throw new ApiError('Invalid OpenAI API key', 401);
        case 429:
          throw new ApiError('OpenAI API rate limit exceeded. Please try again later.', 429);
        case 500:
          throw new ApiError('OpenAI service error. Please try again later.', 500);
        default:
          throw new ApiError('OpenAI API error: ' + error.message, error.status || 500);
      }
    }

    // Handle network or other errors
    if (error instanceof Error) {
      throw new ApiError(
        'Failed to communicate with OpenAI: ' + error.message,
        500
      );
    }

    throw new ApiError('An unexpected error occurred during analysis', 500);
  }
}