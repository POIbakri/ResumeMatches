import { ANALYSIS_LIMITS } from './limits';

export const STRIPE_CONFIG = {
  PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_mock',
  PRICES: {
    // PRO_MONTHLY: 'price_1QeA8NDCDYG5RrkYDlGDFzVF',
    PRO_MONTHLY: 'price_1QeARbDCDYG5RrkY6kSqLkmL',
  },
  ANALYSIS_LIMITS,
  MOCK_MODE: true,
} as const;