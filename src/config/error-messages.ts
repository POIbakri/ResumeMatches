export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_IN_USE: 'This email is already registered',
    WEAK_PASSWORD: 'Password must be at least 8 characters',
    SESSION_EXPIRED: 'Your session has expired. Please sign in again',
  },
  API: {
    GENERAL: 'An unexpected error occurred',
    NETWORK: 'Network error. Please check your connection',
    RATE_LIMIT: 'Too many requests. Please try again later',
  },
  ANALYSIS: {
    FAILED: 'Failed to analyze CV',
    NOT_FOUND: 'Analysis not found',
    LIMIT_REACHED: 'Analysis limit reached. Please upgrade your plan',
  },
} as const;