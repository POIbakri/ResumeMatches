import { useCandidateHistory } from '../upload/hooks/useCandidateHistory';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { formatDate } from '../../lib/utils';

export function CandidateHistory() {
  const { candidates, isLoading } = useCandidateHistory();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      {candidates.map((candidate) => (
        <div key={candidate.id} className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900">{candidate.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{formatDate(candidate.created_at)}</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{candidate.cv_text}</p>
        </div>
      ))}
      {!candidates.length && (
        <p className="text-gray-500 text-center py-4">No previous candidates found</p>
      )}
    </div>
  );
}