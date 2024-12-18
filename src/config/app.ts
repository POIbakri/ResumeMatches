export const APP_CONFIG = {
  name: 'Plus+ Talent',
  version: '1.0.0',
  api: {
    baseUrl: import.meta.env.VITE_API_URL || '',
    timeout: 30000,
  },
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
  dates: {
    format: 'MMM d, yyyy',
    timezone: 'UTC',
  },
} as const;