import { useAnalysisDetails } from './hooks/useAnalysisDetails';
import { AnalysisResults } from './AnalysisResults';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { Button } from '../form/Button';
import { ExportButton } from './ExportButton';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface AnalysisDetailsProps {
  analysisId: string;
  onClose: () => void;
}

export function AnalysisDetails({ analysisId, onClose }: AnalysisDetailsProps) {
  const { analysis, isLoading, error } = useAnalysisDetails(analysisId);
  const [candidateName, setCandidateName] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');

  useEffect(() => {
    async function fetchDetails() {
      if (!analysis) return;

      // Fetch candidate name
      const { data: candidateData } = await supabase
        .from('candidates')
        .select('name')
        .eq('id', analysis.candidate_id)
        .single();

      // Fetch job title
      const { data: jobData } = await supabase
        .from('jobs')
        .select('title')
        .eq('id', analysis.job_id)
        .single();

      setCandidateName(candidateData?.name || 'Unknown Candidate');
      setJobTitle(jobData?.title || 'Unknown Position');
    }

    fetchDetails();
  }, [analysis]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || 'Analysis not found'}</p>
        <Button variant="secondary" onClick={onClose}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{`${candidateName} × ${jobTitle} Report`}</h2>
        <div className="flex gap-3">
          <ExportButton analysis={analysis} />
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
      <AnalysisResults analysis={analysis} />
    </div>
  );
}