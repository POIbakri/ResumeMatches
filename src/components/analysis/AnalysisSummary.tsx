import { UserIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import type { Analysis } from '../../types/models';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface AnalysisSummaryProps {
  analysis: Analysis;
}

export function AnalysisSummary({ analysis }: AnalysisSummaryProps) {
  const [candidateDetails, setCandidateDetails] = useState({ name: '', cv_text: '' });
  const [jobDetails, setJobDetails] = useState({ title: '', company: '', jd_text: '' });

  useEffect(() => {
    async function fetchDetails() {
      // Fetch candidate details
      const { data: candidateData } = await supabase
        .from('candidates')
        .select('name, cv_text')
        .eq('id', analysis.candidate_id)
        .single();

      // Fetch job details
      const { data: jobData } = await supabase
        .from('jobs')
        .select('title, company, jd_text')
        .eq('id', analysis.job_id)
        .single();

      if (candidateData) {
        setCandidateDetails(candidateData);
      }
      if (jobData) {
        setJobDetails(jobData);
      }
    }

    fetchDetails();
  }, [analysis.candidate_id, analysis.job_id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <UserIcon className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium">Candidate Profile</h4>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="text-base text-gray-900">{candidateDetails.name || 'Loading...'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">CV Summary</p>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{analysis.cv_summary}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <BriefcaseIcon className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium">Position Details</h4>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-500">Position</p>
            <p className="text-base text-gray-900">{jobDetails.title || 'Loading...'}</p>
          </div>
          {jobDetails.company && (
            <div>
              <p className="text-sm font-medium text-gray-500">Company</p>
              <p className="text-base text-gray-900">{jobDetails.company}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500">Requirements</p>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{analysis.job_requirements}</p>
          </div>
        </div>
      </div>
    </div>
  );
}