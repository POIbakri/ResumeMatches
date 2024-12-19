export interface TechnicalSkill {
  name: string;
  proficiency: number;
  assessment: string;
  recommendations?: string;
}

export type Verdict = 'GOOD_FIT' | 'NEEDS_CONSIDERATION' | 'BAD_FIT';

export interface InterviewQuestion {
  id: string;
  category: 'technical' | 'behavioral' | 'cultural' | 'problem-solving';
  question: string;
  expectedAnswer?: string;
  redFlags?: string[];
  greenFlags?: string[];
  created_at: string;
  times_used: number;
}

export interface Analysis {
  id: string;
  candidate_id: string;
  job_id: string;
  fit_score: number;
  verdict: Verdict;
  reasoning: string[];
  suggestions: string[];
  interview_plan: string;
  cv_summary: string;
  job_requirements: string;
  created_at: string;
  questions_used: InterviewQuestion[];
  notes?: string;
  status: 'pending' | 'interviewed' | 'hired' | 'rejected';
  interview_date?: string;
  interviewer_feedback?: string;
  technical_skills?: TechnicalSkill[];
  risk_factors?: string[];
  growth_potential?: {
    areas: string[];
    recommendations: string[];
  };
}

export interface AnalysisHistory extends Analysis {
  candidate_name: string;
  job_title: string;
}

export interface Candidate {
  id: string;
  name: string;
  cv_text: string;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  created_at: string;
}