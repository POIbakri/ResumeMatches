import { useState } from 'react';
import type { Analysis } from '../../types/models';
import { ScoreCard } from './ScoreCard';
import { TechnicalAnalysis } from './TechnicalAnalysis';
import { RiskFactors } from './RiskFactors';
import { GrowthPotential } from './GrowthPotential';
import { InterviewPlan } from './InterviewPlan';
import { AnalysisSummary } from './AnalysisSummary';
import { AnalysisNotes } from './AnalysisNotes';
import { ExportButton } from './ExportButton';
import { VerdictCard } from './VerdictCard';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

function ExpandableSection({ title, children, defaultExpanded = false }: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white rounded-xl border border-gray-200 shadow-sm 
        ${isExpanded ? 'ring-2 ring-blue-100' : ''} 
        ${isHovered ? 'border-blue-200' : ''}
        transition-all duration-200 ease-in-out hover:shadow-md`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center text-left p-6"
      >
        <div className="flex items-center space-x-3">
          {isExpanded ? (
            <ChevronUpIcon className={`h-5 w-5 ${isHovered ? 'text-blue-500' : 'text-gray-400'} transition-colors`} />
          ) : (
            <ChevronDownIcon className={`h-5 w-5 ${isHovered ? 'text-blue-500' : 'text-gray-400'} transition-colors`} />
          )}
          <h3 className={`text-lg font-semibold ${isHovered ? 'text-blue-600' : 'text-gray-900'} transition-colors`}>
            {title}
          </h3>
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-full 
          ${isExpanded ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'} 
          transition-colors`}>
          {isExpanded ? 'Hide' : 'Show'}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className={`px-6 pb-6 border-t border-gray-100 
          ${isExpanded ? 'pt-4' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface AnalysisResultsProps {
  analysis: Analysis;
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm">
        <ScoreCard score={analysis.fit_score} verdict={analysis.verdict} />
        <div className="mt-6">
          <VerdictCard verdict={analysis.verdict} reasoning={analysis.reasoning} />
        </div>
      </div>

      <div className="space-y-4">
        <ExpandableSection title="Analysis Summary" defaultExpanded={false}>
          <AnalysisSummary analysis={analysis} />
        </ExpandableSection>

        <ExpandableSection title="Technical Analysis" defaultExpanded={false}>
          <TechnicalAnalysis analysis={analysis} />
        </ExpandableSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ExpandableSection title="Risk Factors" defaultExpanded={false}>
            <RiskFactors factors={analysis.risk_factors} />
          </ExpandableSection>
          
          <ExpandableSection title="Growth Potential" defaultExpanded={false}>
            <GrowthPotential potential={analysis.growth_potential} />
          </ExpandableSection>
        </div>

        <ExpandableSection title="Interview Plan" defaultExpanded={false}>
          <InterviewPlan plan={analysis.interview_plan} />
        </ExpandableSection>
      </div>

      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm">
        <AnalysisNotes analysis={analysis} />
        <div className="mt-6">
          <ExportButton analysis={analysis} />
        </div>
      </div>
    </div>
  );
}