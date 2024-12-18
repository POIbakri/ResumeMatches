import React from 'react';
import { useToast } from '../../hooks/useToast';
import { useAnalysisHistory } from '../analysis/hooks/useAnalysisHistory';
import { 
  DocumentPlusIcon, 
  UserPlusIcon,
  DocumentDuplicateIcon,
  ArrowPathIcon 
} from '@heroicons/react/24/outline';

export function QuickActions() {
  const { addToast } = useToast();
  const { refetch } = useAnalysisHistory();

  const handleNewAnalysis = () => {
    // Find and click the "New Analysis" tab
    const newAnalysisTab = document.querySelector('[data-tab="new"]') as HTMLElement;
    if (newAnalysisTab) {
      newAnalysisTab.click();
      // Clear any existing form data
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) form.reset();
      // Scroll to the form
      window.scrollTo({ top: 0, behavior: 'smooth' });
      addToast('Ready to start new analysis', 'info');
    }
  };

  const handleAddCandidate = () => {
    // Find and click the "New Analysis" tab
    const newAnalysisTab = document.querySelector('[data-tab="new"]') as HTMLElement;
    if (newAnalysisTab) {
      newAnalysisTab.click();
      // Clear any existing form data
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) form.reset();
      // Focus on the candidate name input
      setTimeout(() => {
        const candidateNameInput = document.querySelector('#candidateName') as HTMLInputElement;
        if (candidateNameInput) {
          candidateNameInput.focus();
          window.scrollTo({ 
            top: candidateNameInput.offsetTop - 100, 
            behavior: 'smooth' 
          });
        }
      }, 100);
      addToast('Ready to add a new candidate', 'info');
    }
  };

  const handleDuplicateJob = () => {
    // Find and click the "New Analysis" tab first
    const newAnalysisTab = document.querySelector('[data-tab="new"]') as HTMLElement;
    if (newAnalysisTab) {
      newAnalysisTab.click();
      // Then find and click the job selector button
      setTimeout(() => {
        const jobSelector = document.querySelector('[data-action="select-job"]') as HTMLElement;
        if (jobSelector) {
          jobSelector.click();
          window.scrollTo({ 
            top: jobSelector.offsetTop - 100, 
            behavior: 'smooth' 
          });
          addToast('Select a previous job to reuse', 'info');
        }
      }, 100);
    }
  };

  const handleRefreshData = async () => {
    try {
      await refetch();
      addToast('Data refreshed successfully', 'success');
    } catch (error) {
      addToast('Failed to refresh data', 'error');
    }
  };

  const actions = [
    {
      name: 'New Analysis',
      icon: DocumentPlusIcon,
      description: 'Start a new CV analysis',
      onClick: handleNewAnalysis,
    },
    {
      name: 'Add Candidate',
      icon: UserPlusIcon,
      description: 'Add a new candidate to the system',
      onClick: handleAddCandidate,
    },
    {
      name: 'Duplicate Job',
      icon: DocumentDuplicateIcon,
      description: 'Use previous job description',
      onClick: handleDuplicateJob,
    },
    {
      name: 'Refresh Data',
      icon: ArrowPathIcon,
      description: 'Update all analysis data',
      onClick: handleRefreshData,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={action.onClick}
            className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <action.icon className="h-6 w-6 text-gray-400 group-hover:text-blue-500 mb-2" />
            <h3 className="text-sm font-medium text-gray-900">{action.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}