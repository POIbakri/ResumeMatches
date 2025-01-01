import { useState, useRef } from 'react';
import { useCandidateHistory } from './hooks/useCandidateHistory';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { truncateText, isDuplicateCandidate } from '../../lib/utils';

interface GroupedCandidate {
  id: string;
  name: string;
  cv_text: string;
  created_at: string;
  duplicateCount: number;
  lastSubmitted: string;
}

interface CandidateSelectorProps {
  onSelect: (candidate: { name: string; cvText: string }) => void;
}

export function CandidateSelector({ onSelect }: CandidateSelectorProps) {
  const { candidates, isLoading } = useCandidateHistory();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

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

  if (isLoading) {
    return <LoadingSpinner size="sm" />;
  }

  if (!candidates.length) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
      >
        <span>Previous CVs</span>
        <ChevronDownIcon className="ml-1 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-96 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="max-h-60 overflow-auto py-1">
            {groupedCandidates.map((candidate) => (
              <button
                key={candidate.id}
                onClick={() => {
                  onSelect({ name: candidate.name, cvText: candidate.cv_text });
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
              >
                <div className="flex justify-between items-start">
                  <p className="font-medium text-gray-900">{candidate.name}</p>
                  {candidate.duplicateCount > 1 && (
                    <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                      Submitted {candidate.duplicateCount} times
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {truncateText(candidate.cv_text, 150)}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}