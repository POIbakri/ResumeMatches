import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { exportAnalysisToPDF } from '../../utils/pdfExport';
import type { Analysis } from '../../types/models';

interface ExportButtonProps {
  analysis: Analysis;
}

export function ExportButton({ analysis }: ExportButtonProps) {
  return (
    <button
      onClick={() => exportAnalysisToPDF(analysis)}
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <ArrowDownTrayIcon className="h-5 w-5 mr-2 text-gray-500" />
      Export PDF
    </button>
  );
}