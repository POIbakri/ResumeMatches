export const ANALYSIS_LIMITS = {
  FREE: 4,
  PRO: 1000,
} as const;

export const USAGE_THRESHOLDS = {
  WARNING: 0.8, // Show warning at 80% usage
  CRITICAL: 0.95, // Show critical warning at 95% usage
} as const;