import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { exportAnalysisToPDF } from '../../utils/pdfExport';
import type { Analysis } from '../../types/models';

interface ExportButtonProps {
  analysis: Analysis;
}

export function ExportButton({ analysis }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await exportAnalysisToPDF(analysis);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      // You might want to add a toast notification here
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ArrowDownTrayIcon className={`h-5 w-5 mr-2 ${isExporting ? 'animate-bounce' : 'text-gray-500'}`} />
      {isExporting ? 'Exporting...' : 'Export PDF'}
    </button>
  );
}