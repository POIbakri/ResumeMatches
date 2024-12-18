import React, { useState } from 'react';
import { useAnalysisHistory } from './hooks/useAnalysisHistory';
import { AnalysisCard } from './AnalysisCard';
import { AnalysisDetails } from './AnalysisDetails';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { EmptyState } from '../feedback/EmptyState';

export function AnalysisHistory() {
  const { analyses, isLoading, error } = useAnalysisHistory();
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);

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

  if (!analyses.length) {
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
      {analyses.map((analysis) => (
        <AnalysisCard
          key={analysis.id}
          analysis={analysis}
          onClick={() => setSelectedAnalysis(analysis.id)}
        />
      ))}
    </div>
  );
}