import { useAnalysisHistory } from '../analysis/hooks/useAnalysisHistory';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { formatTimeAgo } from '../../lib/utils';

export function RecentActivity() {
  const { analyses, isLoading } = useAnalysisHistory();
  const recentAnalyses = analyses.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
      
      {isLoading ? (
        <div className="flex justify-center py-4">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="h-48 overflow-y-auto pr-2">
          <div className="space-y-4">
            {recentAnalyses.map((analysis) => (
              <div key={analysis.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {analysis.fit_score}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    New analysis completed
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatTimeAgo(analysis.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}