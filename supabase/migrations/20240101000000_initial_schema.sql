-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE subscription_status AS ENUM ('active', 'trialing', 'past_due', 'canceled');
CREATE TYPE subscription_plan AS ENUM ('free', 'pro');

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  company text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create candidates table
CREATE TABLE public.candidates (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  name text NOT NULL,
  cv_text text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  jd_text text NOT NULL,
  company text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create analysis table
CREATE TABLE public.analysis (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  candidate_id uuid REFERENCES public.candidates(id) NOT NULL,
  job_id uuid REFERENCES public.jobs(id) NOT NULL,
  fit_score integer NOT NULL CHECK (fit_score BETWEEN 1 AND 10),
  verdict text NOT NULL,
  reasoning text[] NOT NULL,
  technical_skills jsonb DEFAULT '{}'::jsonb,
  risk_factors text[] DEFAULT '{}',
  growth_potential jsonb DEFAULT '{}'::jsonb,
  interview_plan text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (candidate_id, job_id)
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) UNIQUE NOT NULL,
  status subscription_status NOT NULL DEFAULT 'trialing',
  plan subscription_plan NOT NULL DEFAULT 'free',
  stripe_customer_id text UNIQUE,
  stripe_subscription_id text UNIQUE,
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  analysis_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create security policies
-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Candidates policies
CREATE POLICY "Users can view own candidates"
  ON public.candidates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create candidates"
  ON public.candidates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Jobs policies
CREATE POLICY "Users can view own jobs"
  ON public.jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create jobs"
  ON public.jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Analysis policies
CREATE POLICY "Users can view own analysis"
  ON public.analysis FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create analysis"
  ON public.analysis FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analysis"
  ON public.analysis FOR UPDATE
  USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Create functions and triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_candidates_updated_at
  BEFORE UPDATE ON public.candidates
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_analysis_updated_at
  BEFORE UPDATE ON public.analysis
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Create function to increment analysis count
CREATE OR REPLACE FUNCTION increment_analysis_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.subscriptions
  SET analysis_count = analysis_count + 1
  WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to track analysis count
CREATE TRIGGER track_analysis_count
  AFTER INSERT ON public.analysis
  FOR EACH ROW
  EXECUTE PROCEDURE increment_analysis_count();

-- Create indexes for better performance
CREATE INDEX idx_candidates_user_id ON public.candidates(user_id);
CREATE INDEX idx_jobs_user_id ON public.jobs(user_id);
CREATE INDEX idx_analysis_user_id ON public.analysis(user_id);
CREATE INDEX idx_analysis_candidate_id ON public.analysis(candidate_id);
CREATE INDEX idx_analysis_job_id ON public.analysis(job_id);
CREATE INDEX idx_analysis_created_at ON public.analysis(created_at DESC);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);