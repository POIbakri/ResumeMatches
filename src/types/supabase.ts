export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          company: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          company?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          company?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      candidates: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          cv_text: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          cv_text: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          cv_text?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          jd_text: string;
          company: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          jd_text: string;
          company?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          jd_text?: string;
          company?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      analysis: {
        Row: {
          id: string;
          user_id: string;
          candidate_id: string;
          job_id: string;
          fit_score: number;
          verdict: string;
          reasoning: string[];
          suggestions: string[];
          interview_plan: string;
          cv_summary: string;
          job_requirements: string;
          technical_skills: any | null;
          risk_factors: string[] | null;
          growth_potential: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          candidate_id: string;
          job_id: string;
          fit_score: number;
          verdict: string;
          reasoning: string[];
          suggestions: string[];
          interview_plan: string;
          cv_summary: string;
          job_requirements: string;
          technical_skills?: any | null;
          risk_factors?: string[] | null;
          growth_potential?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          candidate_id?: string;
          job_id?: string;
          fit_score?: number;
          verdict?: string;
          reasoning?: string[];
          suggestions?: string[];
          interview_plan?: string;
          cv_summary?: string;
          job_requirements?: string;
          technical_skills?: any | null;
          risk_factors?: string[] | null;
          growth_potential?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          status: string;
          plan: string;
          current_period_start: string;
          current_period_end: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status: string;
          plan: string;
          current_period_start: string;
          current_period_end: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: string;
          plan?: string;
          current_period_start?: string;
          current_period_end?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}