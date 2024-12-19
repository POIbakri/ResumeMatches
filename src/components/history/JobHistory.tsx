import { useJobHistory } from '../upload/hooks/useJobHistory';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { formatDate } from '../../lib/utils';

export function JobHistory() {
  const { jobs, isLoading } = useJobHistory();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{formatDate(job.created_at)}</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{job.jd_text}</p>
        </div>
      ))}
      {!jobs.length && (
        <p className="text-gray-500 text-center py-4">No previous jobs found</p>
      )}
    </div>
  );
}