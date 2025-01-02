import type { Verdict } from '../../types/models';

interface ScoreCardProps {
  score: number;
  verdict: Verdict;
}

export function ScoreCard({ score, verdict }: ScoreCardProps) {
  const getScoreStyle = () => {
    switch (verdict) {
      case 'STRONG_FIT':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'POTENTIAL_FIT':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'NEEDS_CONSIDERATION':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'NOT_RECOMMENDED':
        return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getMessage = () => {
    switch (verdict) {
      case 'STRONG_FIT':
        return 'Strong Match';
      case 'POTENTIAL_FIT':
        return 'Potential Match';
      case 'NEEDS_CONSIDERATION':
        return 'Potential Match';
      case 'NOT_RECOMMENDED':
        return 'Not Suitable';
    }
  };

  return (
    <div className={`p-6 rounded-lg border ${getScoreStyle()}`}>
      <h3 className="font-semibold mb-4">Match Score</h3>
      <div className="flex items-baseline space-x-2">
        <span className="text-5xl font-bold">{score}</span>
        <span className="text-2xl">/10</span>
      </div>
      <p className="mt-2 text-sm font-medium">{getMessage()}</p>
    </div>
  );
}