/**
 * Analytics & Monitoring Configuration
 * Centralized setup for tracking, error reporting, and performance monitoring
 */

interface AnalyticsConfig {
  googleAnalyticsId?: string;
  sentryDsn?: string;
  enablePerformanceMonitoring: boolean;
  enableErrorReporting: boolean;
  environment: 'development' | 'production' | 'staging';
}

const config: AnalyticsConfig = {
  // Google Analytics
  googleAnalyticsId: import.meta.env.PUBLIC_GA_ID || '',

  // Sentry (Error Reporting)
  sentryDsn: import.meta.env.PUBLIC_SENTRY_DSN || '',

  // Features
  enablePerformanceMonitoring: import.meta.env.PROD,
  enableErrorReporting: import.meta.env.PROD,

  // Environment
  environment: import.meta.env.PROD ? 'production' : 'development',
};

/**
 * Initialize Google Analytics
 */
export function initializeGoogleAnalytics() {
  if (!config.googleAnalyticsId || typeof window === 'undefined') {
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', config.googleAnalyticsId, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  (window as any).gtag = gtag;
}

/**
 * Track custom events
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, unknown>
) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, eventData);

  // Log in development
  if (import.meta.env.DEV) {
    console.log(`[Analytics Event] ${eventName}`, eventData);
  }
}

/**
 * Track page views
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('config', config.googleAnalyticsId, {
    page_path: path,
    page_title: title,
  });

  if (import.meta.env.DEV) {
    console.log(`[Page View] ${path}`, title);
  }
}

/**
 * Track tool conversions
 */
export function trackConversion(
  toolName: string,
  inputFormat: string,
  outputFormat: string,
  success: boolean,
  duration?: number
) {
  trackEvent('tool_conversion', {
    tool_name: toolName,
    input_format: inputFormat,
    output_format: outputFormat,
    success,
    duration_ms: duration,
  });
}

/**
 * Track errors
 */
export function trackError(
  errorId: string,
  errorMessage: string,
  context?: string
) {
  trackEvent('error', {
    error_id: errorId,
    error_message: errorMessage,
    error_context: context,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track feature usage
 */
export function trackFeatureUsage(featureName: string, metadata?: Record<string, unknown>) {
  trackEvent('feature_usage', {
    feature: featureName,
    ...metadata,
  });
}

/**
 * Initialize Sentry (Error Reporting Service)
 * Uncomment when Sentry is ready to use
 */
export async function initializeSentry() {
  if (!config.sentryDsn || typeof window === 'undefined' || import.meta.env.DEV) {
    return;
  }

  try {
    // Lazy load Sentry SDK
    const Sentry = await import('@sentry/astro');

    Sentry.init({
      dsn: config.sentryDsn,
      environment: config.environment,
      tracesSampleRate: 0.1, // Sample 10% of transactions
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      integrations: [
        new Sentry.Replay(),
      ],
    });
  } catch (error) {
    console.warn('Failed to initialize Sentry:', error);
  }
}

/**
 * Performance monitoring
 */
export function initializePerformanceMonitoring() {
  if (!config.enablePerformanceMonitoring || typeof window === 'undefined') {
    return;
  }

  // Log Web Vitals
  if ('PerformanceObserver' in window) {
    try {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        trackEvent('web_vital', {
          metric: 'LCP',
          value: lastEntry.renderTime || lastEntry.loadTime,
          unit: 'ms',
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          trackEvent('web_vital', {
            metric: 'FID',
            value: entry.processingDuration,
            unit: 'ms',
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let cls = 0;
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        });
        trackEvent('web_vital', {
          metric: 'CLS',
          value: cls,
          unit: 'score',
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('Performance monitoring error:', error);
      }
    }
  }
}

export default config;

// Extend window object for TypeScript
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
