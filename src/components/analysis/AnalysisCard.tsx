import type { Analysis } from '../../types/models';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface AnalysisCardProps {
  analysis: Analysis;
  onClick?: () => void;
}

export function AnalysisCard({ analysis, onClick }: AnalysisCardProps) {
  const [candidateName, setCandidateName] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');

  useEffect(() => {
    async function fetchDetails() {
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
  }, [analysis.candidate_id, analysis.job_id]);

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg ${onClick ? 'hover:bg-gray-50 cursor-pointer' : ''} transition-colors`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{`${candidateName} × ${jobTitle} Report`}</h3>
          <p className="text-sm text-gray-500">
            {new Date(analysis.created_at ?? '').toLocaleDateString()}
          </p>
        </div>
        <div className={`px-2 py-1 rounded text-sm ${getScoreColor(analysis.fit_score)}`}>
          Score: {analysis.fit_score}/10
        </div>
      </div>
    </div>
  );
}