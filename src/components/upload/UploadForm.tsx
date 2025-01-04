import { CandidateForm } from './CandidateForm';
import { JobForm } from './JobForm';
import { Button } from '../form/Button';
import { AnalysisResults } from '../analysis/AnalysisResults';
import { useUploadForm } from './hooks/useUploadForm';
import { useSubscription } from '../../hooks/useSubscription';
import { UsageIndicator } from '../pricing/UsageIndicator';
import { Link } from 'react-router-dom';
import { DocumentArrowUpIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export function UploadForm() {
  const { values, errors, setFieldValue, handleSubmit, analysis, isLoading } = useUploadForm();
  const { canAnalyze } = useSubscription();

  if (!canAnalyze) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Upgrade Your Plan
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            You've reached the limit of your free analyses. Upgrade to Pro for unlimited analyses and advanced features.
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
          >
            View Pricing Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <DocumentArrowUpIcon className="w-6 h-6 text-blue-600" />
            New Analysis
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Upload a CV and Job Description to get started
          </p>
        </div>
        <UsageIndicator />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <CandidateForm
              candidateName={values.candidateName}
              cvText={values.cvText}
              onNameChange={(value) => setFieldValue('candidateName', value)}
              onCvTextChange={(value) => setFieldValue('cvText', value)}
              errors={{
                name: errors.candidateName,
                cvText: errors.cvText
              }}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <JobForm
              jobTitle={values.jobTitle}
              jobDescription={values.jobDescription}
              onTitleChange={(value) => setFieldValue('jobTitle', value)}
              onDescriptionChange={(value) => setFieldValue('jobDescription', value)}
              errors={{
                title: errors.jobTitle,
                description: errors.jobDescription
              }}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 sticky bottom-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setFieldValue('candidateName', '');
              setFieldValue('cvText', '');
              setFieldValue('jobTitle', '');
              setFieldValue('jobDescription', '');
            }}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Clear Form
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            {isLoading ? 'Analyzing...' : 'Analyze CV'}
          </Button>
        </div>
      </form>

      {analysis && (
        <div className="mt-8">
          <AnalysisResults analysis={analysis} />
        </div>
      )}
    </div>
  );
}