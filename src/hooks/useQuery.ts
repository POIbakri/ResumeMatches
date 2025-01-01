import { useState, useEffect, useCallback, useRef } from 'react';

interface QueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useQuery<T>(
  queryFn: () => Promise<T>,
  options?: { enabled?: boolean }
): QueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Store queryFn in a ref to prevent it from triggering useEffect
  const queryFnRef = useRef(queryFn);
  queryFnRef.current = queryFn;

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await queryFnRef.current();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []); // Remove queryFn from dependencies

  useEffect(() => {
    if (options?.enabled !== false) {
      fetch();
    }
  }, [fetch, options?.enabled]);

  return {
    data,
    isLoading,
    error,
    refetch: fetch
  };
}