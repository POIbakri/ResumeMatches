export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface WithUser {
  user_id: string;
}

export type SortDirection = 'asc' | 'desc';
export type SortOrder = { field: string; direction: SortDirection };