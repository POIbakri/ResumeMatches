import { useAnalysisHistory } from './hooks/useAnalysisHistory';
import { AnalysisCard } from './AnalysisCard';
import { AnalysisDetails } from './AnalysisDetails';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { EmptyState } from '../feedback/EmptyState';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ApiError } from '../../lib/errors';

export function AnalysisHistory() {
  const { isLoading, error } = useAnalysisHistory();
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);
  const [userAnalyses, setUserAnalyses] = useState<any[]>([]);

  // Get current user's analyses
  const getCurrentUserAnalyses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new ApiError('User not authenticated', 401);

      const { data, error } = await supabase
        .from('analysis')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserAnalyses(data || []);
    } catch (error) {
      console.error('Error fetching user analyses:', error);
    }
  };

  // Load user analyses on mount
  useEffect(() => {
    getCurrentUserAnalyses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Error loading analyses"
        description={error}
      />
    );
  }

  if (!userAnalyses.length) {
    return (
      <EmptyState
        title="No analyses yet"
        description="Start by analyzing a candidate's CV against a job description."
      />
    );
  }

  if (selectedAnalysis) {
    return (
      <AnalysisDetails
        analysisId={selectedAnalysis}
        onClose={() => setSelectedAnalysis(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {userAnalyses.map((analysis) => (
        <AnalysisCard
          key={analysis.id}
          analysis={analysis}
          onClick={() => setSelectedAnalysis(analysis.id ?? null)}
        />
      ))}
    </div>
  );
}