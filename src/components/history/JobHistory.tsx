import { useJobHistory } from '../upload/hooks/useJobHistory';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { formatDate, isDuplicateJob } from '../../lib/utils';

interface GroupedJob {
  id: string;
  title: string;
  jd_text: string;
  created_at: string;
  duplicateCount: number;
  lastSubmitted: string;
}

export function JobHistory() {
  const { jobs, isLoading } = useJobHistory();

  // Group duplicates together
  const groupedJobs = jobs.reduce<GroupedJob[]>((acc, current) => {
    const duplicateIndex = acc.findIndex(group => 
      isDuplicateJob(current.title, current.jd_text, [group])
    );

    if (duplicateIndex >= 0) {
      acc[duplicateIndex].duplicateCount += 1;
      acc[duplicateIndex].lastSubmitted = new Date(
        Math.max(
          new Date(acc[duplicateIndex].lastSubmitted).getTime(),
          new Date(current.created_at).getTime()
        )
      ).toISOString();
    } else {
      acc.push({
        ...current,
        duplicateCount: 1,
        lastSubmitted: current.created_at
      });
    }
    return acc;
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      {groupedJobs.map((job) => (
        <div key={job.id} className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900">{job.title}</h3>
            {job.duplicateCount > 1 && (
              <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                Submitted {job.duplicateCount} times
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Last submitted: {formatDate(job.lastSubmitted)}
          </p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{job.jd_text}</p>
        </div>
      ))}
      {!jobs.length && (
        <p className="text-gray-500 text-center py-4">No previous jobs found</p>
      )}
    </div>
  );
}