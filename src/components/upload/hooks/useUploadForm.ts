import { useForm } from '../../../hooks/useForm';
import { useAnalysis } from '../../analysis/hooks/useAnalysis';
import { candidateSchema, jobSchema } from '../../../lib/validation';
import { z } from 'zod';

const uploadFormSchema = z.object({
  candidateName: candidateSchema.shape.name,
  cvText: candidateSchema.shape.cv_text,
  jobTitle: jobSchema.shape.title,
  jobDescription: jobSchema.shape.jd_text,
});

export type UploadFormValues = z.infer<typeof uploadFormSchema>;

const initialValues: UploadFormValues = {
  candidateName: '',
  cvText: '',
  jobTitle: '',
  jobDescription: '',
};

export function useUploadForm() {
  const { analyze, analysis, isLoading } = useAnalysis();

  const form = useForm<UploadFormValues>({
    initialValues,
    validationSchema: uploadFormSchema,
    onSubmit: analyze,
  });

  return {
    ...form,
    analysis,
    isLoading,
  };
}