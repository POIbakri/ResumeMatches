import { ANALYSIS_LIMITS } from './limits';

export const STRIPE_CONFIG = {
  PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_mock',
  PRICES: {
    PRO_MONTHLY: 'price_mock_monthly_pro_plan',
  },
  ANALYSIS_LIMITS,
  MOCK_MODE: true,
} as const;