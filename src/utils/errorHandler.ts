/**
 * Error handling utilities for PaperRepair
 * Centralized error logging, reporting, and user feedback
 */

export interface AppError {
  id: string;
  message: string;
  code?: string;
  context?: Record<string, unknown>;
  timestamp: number;
  userMessage?: string;
}

class ErrorHandler {
  private static instance: ErrorHandler;
  private errors: AppError[] = [];
  private maxErrors = 50;

  private constructor() {
    this.setupGlobalErrorHandlers();
  }

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private setupGlobalErrorHandlers() {
    // Catch unhandled promise rejections
    if (typeof window !== 'undefined') {
      window.addEventListener('unhandledrejection', (event) => {
        this.captureError(event.reason, 'unhandledRejection');
      });

      // Catch global errors
      window.addEventListener('error', (event) => {
        this.captureError(event.error, 'globalError');
      });
    }
  }

  /**
   * Capture and log an error
   */
  captureError(
    error: unknown,
    context: string = 'general',
    metadata?: Record<string, unknown>
  ): AppError {
    const appError: AppError = {
      id: this.generateErrorId(),
      message: this.getErrorMessage(error),
      code: this.getErrorCode(error),
      context: {
        context,
        ...metadata,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      },
      timestamp: Date.now(),
      userMessage: this.getUserFacingMessage(error, context),
    };

    this.errors.push(appError);

    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error(`[${appError.id}] ${appError.message}`, {
        error,
        appError,
      });
    }

    // Send to monitoring service in production (if configured)
    if (import.meta.env.PROD) {
      this.reportToMonitoring(appError);
    }

    return appError;
  }

  /**
   * Get user-facing error message
   */
  private getUserFacingMessage(error: unknown, context: string): string {
    if (error instanceof Error) {
      if (error.message.includes('File')) {
        return 'There was a problem processing your file. Please try again or use a different file.';
      }
      if (error.message.includes('Memory') || error.message.includes('Out of memory')) {
        return 'The file is too large to process. Please try a smaller file.';
      }
    }

    const contextMessages: Record<string, string> = {
      fileConversion: 'File conversion failed. Please check your file and try again.',
      pdfGeneration: 'PDF generation failed. Please try again.',
      fileUpload: 'File upload failed. Please try again.',
      editing: 'An error occurred while editing. Your changes may not be saved.',
      general: 'Something went wrong. Please try again or contact support.',
    };

    return contextMessages[context] || contextMessages.general;
  }

  /**
   * Extract error message
   */
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    if (error && typeof error === 'object' && 'message' in error) {
      return String(error.message);
    }
    return 'Unknown error occurred';
  }

  /**
   * Extract error code
   */
  private getErrorCode(error: unknown): string | undefined {
    if (error instanceof Error && 'code' in error) {
      return String(error.code);
    }
    return undefined;
  }

  /**
   * Generate unique error ID
   */
  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Report error to monitoring service
   */
  private reportToMonitoring(appError: AppError) {
    // TODO: Implement actual error monitoring service integration
    // This could be Sentry, LogRocket, or custom service
    try {
      if (typeof fetch !== 'undefined') {
        fetch('/api/errors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appError),
        }).catch(() => {
          // Silently fail if monitoring service is unavailable
        });
      }
    } catch {
      // Prevent error reporting from breaking the app
    }
  }

  /**
   * Get all captured errors
   */
  getErrors(): AppError[] {
    return [...this.errors];
  }

  /**
   * Clear error history
   */
  clearErrors() {
    this.errors = [];
  }

  /**
   * Get last error
   */
  getLastError(): AppError | undefined {
    return this.errors[this.errors.length - 1];
  }
}

export const errorHandler = ErrorHandler.getInstance();

/**
 * Wrapper for file operations with error handling
 */
export async function handleFileOperation<T>(
  operation: () => Promise<T>,
  context: string,
  userMessage?: string
): Promise<{ success: boolean; data?: T; error?: AppError }> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    const appError = errorHandler.captureError(error, context);
    if (userMessage) {
      appError.userMessage = userMessage;
    }
    return { success: false, error: appError };
  }
}

/**
 * Wrapper for synchronous operations with error handling
 */
export function handleOperation<T>(
  operation: () => T,
  context: string,
  userMessage?: string
): { success: boolean; data?: T; error?: AppError } {
  try {
    const data = operation();
    return { success: true, data };
  } catch (error) {
    const appError = errorHandler.captureError(error, context);
    if (userMessage) {
      appError.userMessage = userMessage;
    }
    return { success: false, error: appError };
  }
}
