import { useState } from 'react';
import { useCandidateHistory } from '../upload/hooks/useCandidateHistory';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { formatDate, isDuplicateCandidate } from '../../lib/utils';

interface GroupedCandidate {
  id: string;
  name: string;
  cv_text: string;
  created_at: string;
  duplicateCount: number;
  lastSubmitted: string;
}

export function CandidateHistory() {
  const { candidates, isLoading } = useCandidateHistory();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Group duplicates together
  const groupedCandidates = candidates.reduce<GroupedCandidate[]>((acc, current) => {
    const duplicateIndex = acc.findIndex(group => 
      isDuplicateCandidate(current.name, current.cv_text, [group])
    );

    if (duplicateIndex >= 0) {
      acc[duplicateIndex].duplicateCount += 1;
      acc[duplicateIndex].lastSubmitted = new Date(
        Math.max(
          new Date(acc[duplicateIndex].lastSubmitted).getTime(),
          new Date(current.created_at).getTime()
        )
      ).toISOString();
    } else {
      acc.push({
        ...current,
        duplicateCount: 1,
        lastSubmitted: current.created_at
      });
    }
    return acc;
  }, []);

  const formatCVText = (text: string) => {
    return text
      .split(/\n\s*\n/)
      .map(para => para.trim())
      .filter(para => para.length > 0)
      .map(para => para.replace(/\s+/g, ' '))
      .join('\n\n');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      {groupedCandidates.map((candidate) => (
        <div 
          key={candidate.id} 
          className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer 
                     hover:border-gray-300 transition-colors"
          onClick={() => setExpandedId(expandedId === candidate.id ? null : candidate.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setExpandedId(expandedId === candidate.id ? null : candidate.id);
            }
          }}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900">
              {candidate.name}
            </h3>
            {candidate.duplicateCount > 1 && (
              <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                Submitted {candidate.duplicateCount} times
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Last submitted: {formatDate(candidate.lastSubmitted)}
          </p>

          <div 
            className={`text-sm text-gray-600 mt-2 
                      ${expandedId === candidate.id ? '' : 'line-clamp-2'}`}
          >
            {formatCVText(candidate.cv_text).split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-2">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-2 text-sm text-blue-600">
            {expandedId === candidate.id ? 'Click to collapse' : 'Click to expand'}
          </div>
        </div>
      ))}

      {!candidates.length && (
        <p className="text-gray-500 text-center py-4">
          No previous candidates found
        </p>
      )}
    </div>
  );
}