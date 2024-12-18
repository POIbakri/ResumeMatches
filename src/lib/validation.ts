import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');
export const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');

export const candidateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  cv_text: z.string().min(100, 'CV text must be at least 100 characters'),
});

export const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  jd_text: z.string().min(100, 'Job description must be at least 100 characters'),
});

export const analysisSchema = z.object({
  cvText: z.string().min(100, 'CV text must be at least 100 characters'),
  jobDescription: z.string().min(100, 'Job description must be at least 100 characters'),
});

export const subscriptionSchema = z.object({
  plan: z.enum(['free', 'pro']),
  status: z.enum(['active', 'trialing', 'past_due', 'canceled']),
  analysisCount: z.number().min(0),
});