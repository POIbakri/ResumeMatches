import { z } from 'zod';
import { candidateSchema, jobSchema } from '../../../lib/validation';

export const uploadFormSchema = z.object({
  candidateName: candidateSchema.shape.name,
  cvText: candidateSchema.shape.cv_text,
  jobTitle: jobSchema.shape.title,
  jobDescription: jobSchema.shape.jd_text,
});

export type UploadFormValues = z.infer<typeof uploadFormSchema>;

export const initialValues: UploadFormValues = {
  candidateName: '',
  cvText: '',
  jobTitle: '',
  jobDescription: '',
};