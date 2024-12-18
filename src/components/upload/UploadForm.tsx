import React from 'react';
import { CandidateForm } from './CandidateForm';
import { JobForm } from './JobForm';
import { Button } from '../form/Button';
import { AnalysisResults } from '../analysis/AnalysisResults';
import { useUploadForm } from './hooks/useUploadForm';
import { useSubscription } from '../../hooks/useSubscription';
import { UsageIndicator } from '../pricing/UsageIndicator';
import { Link } from 'react-router-dom';

export function UploadForm() {
  const { values, errors, setFieldValue, handleSubmit, analysis, isLoading, resetForm } = useUploadForm();
  const { canAnalyze, subscription } = useSubscription();

  if (!canAnalyze()) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Upgrade Your Plan
        </h2>
        <p className="text-gray-600 mb-6">
          You've reached the limit of your free analyses. Upgrade to Pro for unlimited analyses.
        </p>
        <Link
          to="/pricing"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          View Pricing Plans
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">New Analysis</h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload a CV and job description to get started
          </p>
        </div>
        <UsageIndicator />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
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

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={resetForm}
            disabled={isLoading}
          >
            Clear Form
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
          >
            Analyze CV
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