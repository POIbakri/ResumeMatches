import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Analysis } from '../../types/models';
import { useAnalysisHistory } from '../analysis/hooks/useAnalysisHistory';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { formatTimeAgo } from '../../lib/utils';

interface AnalysisWithDetails extends Analysis {
  candidateName?: string;
  jobTitle?: string;
}

export function RecentActivity() {
  const { analyses, isLoading } = useAnalysisHistory();
  const [analysesWithDetails, setAnalysesWithDetails] = useState<AnalysisWithDetails[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      if (!analyses.length) {
        setIsLoadingDetails(false);
        return;
      }

      const detailedAnalyses = await Promise.all(
        analyses.slice(0, 10).map(async (analysis) => {
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

          return {
            ...analysis,
            candidateName: candidateData?.name || 'Unknown Candidate',
            jobTitle: jobData?.title || 'Unknown Position',
          };
        })
      );

      setAnalysesWithDetails(detailedAnalyses);
      setIsLoadingDetails(false);
    }

    if (analyses.length) {
      fetchDetails();
    }
  }, [analyses]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-[400px] flex flex-col">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center flex-shrink-0">
        <span className="w-2 h-6 bg-blue-600 rounded-full mr-3" />
        Recent Activity
      </h2>
      
      {(isLoading || isLoadingDetails) ? (
        <div className="flex-1 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50 pr-2 -mr-2">
          <div className="space-y-4">
            {analysesWithDetails.length > 0 ? (
              analysesWithDetails.map((analysis) => (
                <div 
                  key={analysis.id} 
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                      <span className="text-sm font-semibold text-white">
                        {analysis.fit_score}/10
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {analysis.candidateName} → {analysis.jobTitle}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Analysis completed {formatTimeAgo(analysis.created_at ?? '')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No recent activity
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}