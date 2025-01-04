import { useState } from 'react';
import { useCandidateHistory } from '../upload/hooks/useCandidateHistory';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { formatDate, isDuplicateCandidate } from '../../lib/utils';
import { UsersIcon, ChevronDownIcon, ChevronUpIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { EmptyState } from '../feedback/EmptyState';

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
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-white/50 rounded-xl backdrop-blur-sm">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!candidates.length) {
    return (
      <EmptyState
        title="No candidates yet"
        description="Previous candidates will appear here once you analyze their CVs."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl p-6 border border-emerald-100">
        <div className="flex items-center gap-3">
          <UsersIcon className="w-6 h-6 text-emerald-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Candidate History</h2>
            <p className="text-sm text-gray-600 mt-1">
              {groupedCandidates.length} unique candidate{groupedCandidates.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {groupedCandidates.map((candidate, index) => (
          <div 
            key={candidate.id} 
            className="group bg-white rounded-xl border border-gray-200 hover:border-emerald-200 shadow-sm hover:shadow-md transition-all duration-200"
            style={{
              animationDelay: `${index * 50}ms`,
              animation: 'fadeInUp 0.5s ease-out forwards'
            }}
          >
            <div
              className="p-6 cursor-pointer"
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
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {candidate.name}
                  </h3>
                  {candidate.duplicateCount > 1 && (
                    <span className="flex items-center gap-1 text-xs px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                      <DocumentDuplicateIcon className="w-3 h-3" />
                      {candidate.duplicateCount}x
                    </span>
                  )}
                </div>
                {expandedId === candidate.id ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                )}
              </div>

              <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                Last submitted {formatDate(candidate.lastSubmitted)}
              </p>

              <div 
                className={`mt-4 text-sm text-gray-600 space-y-3
                  ${expandedId === candidate.id ? '' : 'line-clamp-2'}`}
              >
                {formatCVText(candidate.cv_text).split('\n\n').map((paragraph, i) => (
                  <p key={i} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-4 text-sm text-emerald-600 font-medium">
                {expandedId === candidate.id ? 'Show less' : 'Show more'}
              </div>
            </div>
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