import OpenAI from 'openai';
import { ApiError } from './errors';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key');
}

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo purposes
});

interface AnalysisPrompt {
  cvText: string;
  jobDescription: string;
}

export async function analyzeCV({ cvText, jobDescription }: AnalysisPrompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert HR professional and technical recruiter. Analyze the candidate's CV against the job description and provide:
            1. A fit score from 1-10 (10 being perfect match)
            2. Specific suggestions for improvement
            3. A structured 1-hour interview plan
            
            Format your response exactly as follows:
            FIT_SCORE: [number]
            
            SUGGESTIONS:
            - [suggestion 1]
            - [suggestion 2]
            ...
            
            INTERVIEW_PLAN:
            Introduction (5 minutes)
            - [specific questions/topics]
            
            Technical Assessment (25 minutes)
            - [specific questions/topics]
            
            Experience Deep Dive (20 minutes)
            - [specific questions/topics]
            
            Cultural Fit (5 minutes)
            - [specific questions/topics]
            
            Candidate Questions (5 minutes)`
        },
        {
          role: 'user',
          content: `CV:\n${cvText}\n\nJob Description:\n${jobDescription}`
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

interface ParsedAnalysis {
  fit_score: number;
  suggestions: string;
  interview_plan: string;
}

function parseAnalysisResponse(content: string): ParsedAnalysis {
  const fitScoreMatch = content.match(/FIT_SCORE:\s*(\d+)/i);
  const suggestionsMatch = content.match(/SUGGESTIONS:([\s\S]*?)(?=INTERVIEW_PLAN:)/i);
  const interviewPlanMatch = content.match(/INTERVIEW_PLAN:([\s\S]*$)/i);

  if (!fitScoreMatch || !suggestionsMatch || !interviewPlanMatch) {
    throw new Error('Invalid response format from OpenAI');
  }

  return {
    fit_score: parseInt(fitScoreMatch[1], 10),
    suggestions: suggestionsMatch[1].trim(),
    interview_plan: interviewPlanMatch[1].trim()
  };
}