import { defineMiddleware } from 'astro:middleware';

/**
 * Security headers middleware for PaperRepair
 * Protects against common web vulnerabilities
 */
export const onRequest = defineMiddleware(async (context, next) => {
  // Set security headers
  const response = await next();

  // Content Security Policy - restrict resource loading
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'wasm-unsafe-eval'", // Allow wasm for PDF processing
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "media-src 'self'",
      "connect-src 'self'", // Only allow API calls to same origin
      "frame-ancestors 'none'", // Prevent clickjacking
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');

  // Enable XSS protection in older browsers
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer Policy - limit referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Feature Policy / Permissions Policy - restrict browser features
  response.headers.set(
    'Permissions-Policy',
    [
      'accelerometer=()',
      'ambient-light-sensor=()',
      'autoplay=()',
      'camera=()',
      'encrypted-media=()',
      'fullscreen=(self)',
      'geolocation=()',
      'gyroscope=()',
      'magnetometer=()',
      'microphone=()',
      'midi=()',
      'payment=()',
      'picture-in-picture=()',
      'usb=()',
    ].join(', ')
  );

  // HSTS (HTTP Strict Transport Security) - force HTTPS
  // Only set in production to avoid issues in development
  if (import.meta.env.PROD) {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  return response;
});
