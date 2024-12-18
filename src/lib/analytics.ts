// Analytics tracking (placeholder for production implementation)
export const analytics = {
  trackEvent: (eventName: string, properties?: Record<string, unknown>) => {
    if (ENV.IS_PRODUCTION) {
      // Implement production analytics
      console.log('Analytics event:', eventName, properties);
    }
  },
  
  trackError: (error: Error, context?: Record<string, unknown>) => {
    if (ENV.IS_PRODUCTION) {
      // Implement error tracking
      console.error('Error tracked:', error, context);
    }
  }
};