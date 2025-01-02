export interface TechnicalSkill {
  skill: string;
  proficiency: 'EXPERT' | 'ADVANCED' | 'INTERMEDIATE' | 'BASIC' | 'BEGINNER';
  evidence: string;
  currency: string;
}

export type Verdict = 'STRONG_FIT' | 'POTENTIAL_FIT' | 'NEEDS_CONSIDERATION' | 'NOT_RECOMMENDED';

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

export interface RiskFactor {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  mitigation?: string;
}

export interface Analysis {
  id: string;
  candidate_id: string;
  job_id: string;
  created_at: string;
  fit_score: number;
  verdict: Verdict;
  reasoning: string[];
  technical_skills: TechnicalSkill[];
  risk_factors: RiskFactor[];
  growth_potential: {
    areas: string[];
    recommendations: string[];
  };
  interview_plan: string;
  cv_summary: string;
  job_requirements: string;
  questions_used: string[];
  suggestions: string[];
  status: 'pending' | 'completed' | 'error';
  notes?: string;
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
  jd_text: string;
  company: string;
  created_at: string;
}