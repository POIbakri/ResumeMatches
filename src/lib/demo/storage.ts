import { Analysis, Candidate, Job } from '../../types/models';

class DemoStorage {
  private candidates: Candidate[] = [];
  private jobs: Job[] = [];
  private analyses: Analysis[] = [];

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add sample data
    this.candidates = [{
      id: 'candidate-1',
      name: 'John Smith',
      cv_text: 'Senior Software Engineer with 8+ years of experience',
      created_at: new Date().toISOString()
    }];

    this.jobs = [{
      id: 'job-1',
      title: 'Senior Full Stack Developer',
      jd_text: 'Looking for a senior developer with strong React experience',
      created_at: new Date().toISOString()
    }];

    this.analyses = [{
      id: 'analysis-1',
      candidate_id: 'candidate-1',
      job_id: 'job-1',
      fit_score: 8,
      verdict: 'GOOD_FIT',
      reasoning: ['Strong technical match'],
      suggestions: ['Add more quantitative metrics'],
      interview_plan: 'Technical Assessment (30 minutes)',
      cv_summary: 'Senior engineer with strong experience',
      job_requirements: 'Senior full-stack role',
      created_at: new Date().toISOString(),
      questions_used: [],
      status: 'pending',
      technical_skills: [
        {
          name: 'React',
          proficiency: 90,
          assessment: 'Strong experience with modern React development'
        }
      ],
      risk_factors: ['Limited leadership experience'],
      growth_potential: {
        areas: ['Team leadership', 'System architecture'],
        recommendations: ['Consider leadership training']
      }
    }];
  }

  async insertCandidate(candidate: Omit<Candidate, 'id'>): Promise<Candidate> {
    const newCandidate = {
      ...candidate,
      id: `candidate-${this.candidates.length + 1}`,
    };
    this.candidates.push(newCandidate);
    return newCandidate;
  }

  async listCandidates(): Promise<Candidate[]> {
    return [...this.candidates];
  }

  async insertJob(job: Omit<Job, 'id'>): Promise<Job> {
    const newJob = {
      ...job,
      id: `job-${this.jobs.length + 1}`,
    };
    this.jobs.push(newJob);
    return newJob;
  }

  async listJobs(): Promise<Job[]> {
    return [...this.jobs];
  }

  async insertAnalysis(analysis: Omit<Analysis, 'id'>): Promise<Analysis> {
    const newAnalysis = {
      ...analysis,
      id: `analysis-${this.analyses.length + 1}`,
      created_at: new Date().toISOString(),
      status: 'pending',
      questions_used: [],
      technical_skills: [],
      risk_factors: [],
      growth_potential: {
        areas: [],
        recommendations: []
      }
    } as Analysis;
    
    this.analyses.push(newAnalysis);
    return newAnalysis;
  }

  async getAnalysis(id: string): Promise<Analysis | null> {
    return this.analyses.find(a => a.id === id) || null;
  }

  async listAnalyses(): Promise<Analysis[]> {
    return [...this.analyses];
  }
}

export const demoStorage = new DemoStorage();