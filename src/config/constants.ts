export const APP_CONFIG = {
  APP_NAME: 'Plus+ Talent',
  COMPANY_NAME: 'Plus+ Talent Analytics',
  SUPPORT_EMAIL: 'support@plustalent.ai',
};

export const PRICING = {
  FREE: {
    name: 'Free Trial',
    price: 0,
    period: 'month',
    features: [
      'Up to 4 CV analyses',
      'Basic interview questions',
      'PDF export functionality',
      'Email support'
    ]
  },
  PRO: {
    name: 'Pro Plan',
    price: 12.99,
    period: 'month',
    features: [
      'Unlimited CV analyses',
      'Advanced AI matching',
      'Custom interview plans',
      'Technical skill assessment',
      'Team collaboration',
      'Priority support',
      'Analytics dashboard'
    ]
  }
};

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_IN_USE: 'Email already in use',
  WEAK_PASSWORD: 'Password must be at least 8 characters',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PRICING: '/pricing',
};