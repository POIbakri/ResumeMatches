import { useAnalysisDetails } from './hooks/useAnalysisDetails';
import { AnalysisResults } from './AnalysisResults';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { Button } from '../form/Button';

interface AnalysisDetailsProps {
  analysisId: string;
  onClose: () => void;
}

export function AnalysisDetails({ analysisId, onClose }: AnalysisDetailsProps) {
  const { analysis, isLoading, error } = useAnalysisDetails(analysisId);

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
        <h2 className="text-xl font-semibold">Analysis Details</h2>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
      <AnalysisResults analysis={analysis} />
    </div>
  );
}