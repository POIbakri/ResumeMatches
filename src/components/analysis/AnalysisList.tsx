import React from 'react';
import { useAnalysisHistory } from './hooks/useAnalysisHistory';
import { AnalysisCard } from './AnalysisCard';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { EmptyState } from '../feedback/EmptyState';
import { Button } from '../form/Button';

export function AnalysisList() {
  const { analyses, isLoading, error, refetch } = useAnalysisHistory();

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
        action={
          <Button variant="secondary" onClick={() => refetch()}>
            Try Again
          </Button>
        }
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

  return (
    <div className="space-y-4">
      {analyses.map((analysis) => (
        <AnalysisCard
          key={analysis.id}
          analysis={analysis}
          onClick={() => {/* Handle click */}}
        />
      ))}
    </div>
  );
}