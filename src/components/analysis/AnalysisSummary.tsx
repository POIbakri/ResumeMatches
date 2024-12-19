import { DocumentIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import type { Analysis } from '../../types/models';

interface AnalysisSummaryProps {
  analysis: Analysis;
}

export function AnalysisSummary({ analysis }: AnalysisSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <DocumentIcon className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium">CV Summary</h4>
        </div>
        <p className="text-sm text-gray-600 whitespace-pre-wrap">{analysis.cv_summary}</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <BriefcaseIcon className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium">Job Requirements</h4>
        </div>
        <p className="text-sm text-gray-600 whitespace-pre-wrap">{analysis.job_requirements}</p>
      </div>
    </div>
  );
}