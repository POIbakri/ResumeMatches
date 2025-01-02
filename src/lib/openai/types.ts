export type Industry = 
  | 'SOFTWARE_ENGINEERING'
  | 'FINANCE'
  | 'MARKETING'
  | 'SALES'
  | 'HEALTHCARE';

export interface AnalysisPrompt {
  cvText: string;
  jobDescription: string;
  industry?: Industry;
}

export interface TechnicalSkill {
  skill: string;
  proficiency: 'EXPERT' | 'ADVANCED' | 'INTERMEDIATE' | 'BASIC' | 'BEGINNER';
  evidence: string;
  currency: string;
}

export interface GrowthPotential {
  areas: string[];
  recommendations: string[];
  timeline?: string;
}

export interface ParsedAnalysis {
  fit_score: number;
  verdict: 'GOOD_FIT' | 'NEEDS_CONSIDERATION' | 'BAD_FIT';
  reasoning: string[];
  technical_skills: TechnicalSkill[];
  risk_factors: string[];
  growth_potential: GrowthPotential;
  interview_plan: string;
  industry_specific_insights?: string[];
}