import { useAnalysisHistory } from './hooks/useAnalysisHistory';
import { AnalysisCard } from './AnalysisCard';
import { AnalysisDetails } from './AnalysisDetails';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { EmptyState } from '../feedback/EmptyState';
import { Button } from '../form/Button';
import { useState } from 'react';
import { ClipboardDocumentListIcon, ArrowPathIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

export function AnalysisList() {
  const { analyses, isLoading, error, refetch } = useAnalysisHistory();
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-white/50 rounded-xl backdrop-blur-sm">
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
          <Button 
            variant="secondary" 
            onClick={() => refetch()}
            className="inline-flex items-center gap-2"
          >
            <ArrowPathIcon className="w-4 h-4" />
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

  if (selectedAnalysis) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedAnalysis(null)}
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Back to List</span>
        </button>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <AnalysisDetails
            analysisId={selectedAnalysis}
            onClose={() => setSelectedAnalysis(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 rounded-xl p-6 border border-indigo-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardDocumentListIcon className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Analysis List</h2>
          </div>
          <Button 
            variant="secondary" 
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 hover:bg-white/80"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Refresh
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-2 ml-9">
          {analyses.length} {analyses.length === 1 ? 'analysis' : 'analyses'} found
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {analyses.map((analysis, index) => (
          <div 
            key={analysis.id}
            className="transform transition-all duration-200 hover:scale-[1.01] hover:shadow-md"
            style={{
              animationDelay: `${index * 50}ms`,
              animation: 'fadeInUp 0.5s ease-out forwards'
            }}
          >
            <AnalysisCard
              analysis={analysis}
              onClick={() => setSelectedAnalysis(analysis.id ?? null)}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}