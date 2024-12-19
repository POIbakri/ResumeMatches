import type { Analysis } from '../../types/models';
import { ScoreCard } from './ScoreCard';
import { TechnicalAnalysis } from './TechnicalAnalysis';
import { RiskFactors } from './RiskFactors';
import { GrowthPotential } from './GrowthPotential';
import { InterviewPlan } from './InterviewPlan';

interface AnalysisResultsProps {
  analysis: Analysis;
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  return (
    <div className="space-y-8">
      <ScoreCard score={analysis.fit_score} verdict={analysis.verdict} />
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Technical Analysis</h3>
        <TechnicalAnalysis analysis={analysis} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RiskFactors factors={analysis.risk_factors} />
        <GrowthPotential potential={analysis.growth_potential} />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Interview Plan</h3>
        <InterviewPlan plan={analysis.interview_plan} />
      </div>
    </div>
  );
}