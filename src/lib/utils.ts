import { format, formatDistanceToNow } from 'date-fns';

export function formatDate(date: string): string {
  return format(new Date(date), 'MMMM d, yyyy');
}

export function formatTimeAgo(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function calculateStats(scores: number[]) {
  if (!scores.length) return { average: 0, min: 0, max: 0 };
  return {
    average: scores.reduce((a, b) => a + b, 0) / scores.length,
    min: Math.min(...scores),
    max: Math.max(...scores)
  };
}

export function isDuplicateCandidate(
  newName: string,
  newCvText: string,
  existingCandidates: Array<{ name: string; cv_text: string }>
): boolean {
  return existingCandidates.some(
    candidate => 
      candidate.name.toLowerCase().trim() === newName.toLowerCase().trim() &&
      candidate.cv_text.trim() === newCvText.trim()
  );
}

export function isDuplicateJob(
  newTitle: string,
  newDescription: string,
  existingJobs: Array<{ title: string; jd_text: string }>
): boolean {
  return existingJobs.some(
    job => 
      job.title.toLowerCase().trim() === newTitle.toLowerCase().trim() &&
      job.jd_text.trim() === newDescription.trim()
  );
}