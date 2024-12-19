import { ENV } from "../config";
import { analytics } from "./analytics";

// Performance monitoring
export function measurePerformance<T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> {
  const startTime = performance.now();
  
  return operation().finally(() => {
    const duration = performance.now() - startTime;
    
    if (ENV.IS_PRODUCTION) {
      analytics.trackEvent('performance_measure', {
        operation: operationName,
        duration_ms: Math.round(duration)
      });
    }
  });
}