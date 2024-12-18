import { format, formatDistance, formatRelative } from 'date-fns';

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'MMM d, yyyy');
}

export function formatTimeAgo(date: string | Date): string {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
}

export function formatRelativeTime(date: string | Date): string {
  return formatRelative(new Date(date), new Date());
}