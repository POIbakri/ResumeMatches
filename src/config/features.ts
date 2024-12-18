export const FEATURES = {
  analytics: {
    enabled: import.meta.env.PROD,
  },
  errorReporting: {
    enabled: import.meta.env.PROD,
  },
  mockApi: {
    enabled: import.meta.env.DEV,
  },
} as const;