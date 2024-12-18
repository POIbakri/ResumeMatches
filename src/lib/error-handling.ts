import { ERROR_MESSAGES } from '../config/error-messages';
import { ENV } from '../config/env';

export function handleError(error: unknown): string {
  if (ENV.IS_DEVELOPMENT) {
    console.error('Error details:', error);
  }

  if (error instanceof Error) {
    // Handle specific error types
    if (error.name === 'AuthError') {
      return ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS;
    }
    if (error.name === 'NetworkError') {
      return ERROR_MESSAGES.API.NETWORK;
    }
    return error.message;
  }

  return ERROR_MESSAGES.API.GENERAL;
}