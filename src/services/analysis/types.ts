import type { Analysis } from '../../types/models';

export interface AnalysisInput {
  candidateId: string;
  jobId: string;
}

export interface AnalysisResult extends Analysis {
  candidate_name: string;
  job_title: string;
}