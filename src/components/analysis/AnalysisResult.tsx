import type { Analysis } from '../../types/models';

interface Props {
  analysis: Analysis;
}

export function AnalysisResult({ analysis }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Fit Score</h3>
        <p>{analysis.fit_score}/10</p>
      </div>
      <div>
        <h3 className="font-semibold">Suggestions</h3>
        <p className="whitespace-pre-wrap">{analysis.suggestions}</p>
      </div>
      <div>
        <h3 className="font-semibold">Interview Plan</h3>
        <p className="whitespace-pre-wrap">{analysis.interview_plan}</p>
      </div>
    </div>
  );
}