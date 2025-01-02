import type { Analysis } from '../../types/models';

interface AnalysisCardProps {
  analysis: Analysis;
  onClick?: () => void;
}

export function AnalysisCard({ analysis, onClick }: AnalysisCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg ${onClick ? 'hover:bg-gray-50 cursor-pointer' : ''} transition-colors`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">Candidate Analysis</h3>
          <p className="text-sm text-gray-500">
            {new Date(analysis.created_at ?? '').toLocaleDateString()}
          </p>
        </div>
        <div className={`px-2 py-1 rounded text-sm ${getScoreColor(analysis.fit_score)}`}>
          Score: {analysis.fit_score}/10
        </div>
      </div>
    </div>
  );
}