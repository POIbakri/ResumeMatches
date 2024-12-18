import React from 'react';
import { Chart } from '../charts/Chart';
import { useAnalysisHistory } from '../analysis/hooks/useAnalysisHistory';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { EmptyState } from '../feedback/EmptyState';

export function DashboardInsights() {
  const { analyses, isLoading } = useAnalysisHistory();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (!analyses.length) {
    return (
      <EmptyState
        title="No analysis data yet"
        description="Start analyzing candidates to see insights and trends."
      />
    );
  }

  const averageFitScore = analyses.reduce((sum, a) => sum + a.fit_score, 0) / analyses.length;
  const goodFits = analyses.filter(a => a.verdict === 'GOOD_FIT').length;
  const needsConsideration = analyses.filter(a => a.verdict === 'NEEDS_CONSIDERATION').length;
  const badFits = analyses.filter(a => a.verdict === 'BAD_FIT').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Average Fit Score</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {averageFitScore.toFixed(1)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Good Fits</h3>
          <p className="mt-2 text-3xl font-semibold text-green-600">
            {goodFits}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Needs Review</h3>
          <p className="mt-2 text-3xl font-semibold text-yellow-600">
            {needsConsideration}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Analysis Trends</h3>
        <div className="h-64">
          <Chart
            data={analyses.map(a => ({
              date: new Date(a.created_at),
              score: a.fit_score
            }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Good Fits</h3>
          <div className="space-y-3">
            {analyses
              .filter(a => a.verdict === 'GOOD_FIT')
              .slice(0, 3)
              .map(analysis => (
                <div key={analysis.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{analysis.cv_summary}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(analysis.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-green-600 font-medium">{analysis.fit_score}/10</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Common Skills Needed</h3>
          <div className="space-y-3">
            {analyses
              .flatMap(a => a.technical_skills || [])
              .reduce((acc, skill) => {
                const existing = acc.find(s => s.name === skill.name);
                if (existing) {
                  existing.count++;
                } else {
                  acc.push({ name: skill.name, count: 1 });
                }
                return acc;
              }, [] as { name: string; count: number }[])
              .sort((a, b) => b.count - a.count)
              .slice(0, 5)
              .map(skill => (
                <div key={skill.name} className="flex items-center justify-between">
                  <span className="text-gray-900">{skill.name}</span>
                  <span className="text-gray-500">{skill.count} matches</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}