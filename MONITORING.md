# Monitoring & Analytics Setup Guide

## Overview

PaperRepair includes comprehensive monitoring, error tracking, and analytics to help understand user behavior and identify issues.

---

## 1. Google Analytics Setup

### 1.1 Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property for PaperRepair
3. Copy your **Measurement ID** (format: `G_XXXXXXXXXX`)

### 1.2 Configure Environment Variable
```bash
# .env.local
PUBLIC_GA_ID=G_XXXXXXXXXX
```

### 1.3 Initialize in Your App
Analytics are automatically initialized in the layout. Verify by:
- Opening your app
- Opening browser DevTools → Network tab
- Look for requests to `google-analytics.com`

### 1.4 Track Custom Events
```typescript
import { trackEvent, trackConversion } from '@/utils/analytics';

// Track tool usage
trackConversion(
  'text-to-pdf',      // tool name
  'text',             // input format
  'pdf',              // output format
  true,               // success
  1234                // duration in ms
);

// Track custom events
trackEvent('feature_clicked', {
  feature: 'export_button',
  tool: 'text-to-pdf'
});
```

---

## 2. Error Tracking with Sentry (Optional)

### 2.1 Create Sentry Account
1. Go to [Sentry.io](https://sentry.io)
2. Create a new project for Astro/JavaScript
3. Copy your **DSN** (format: `https://xxxx@xxxx.ingest.sentry.io/xxxxxx`)

### 2.2 Configure Environment Variable
```bash
# .env.local
PUBLIC_SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxxxx
```

### 2.3 Initialize Sentry
```typescript
import { initializeSentry } from '@/utils/analytics';

// Call during app initialization
await initializeSentry();
```

### 2.4 Error Reporting
Errors are automatically captured by:
- Middleware error handler
- Unhandled promise rejections
- Global error listeners

---

## 3. Error Handler Integration

### 3.1 How Errors Are Captured
```typescript
import { errorHandler, handleFileOperation } from '@/utils/errorHandler';

// Automatic error handling
const result = await handleFileOperation(
  () => convertPDF(file),
  'pdfConversion',
  'Failed to convert PDF'
);

if (!result.success) {
  // Error automatically logged and reported
  console.error(result.error?.userMessage);
}
```

### 3.2 Manual Error Capture
```typescript
import { errorHandler } from '@/utils/errorHandler';

try {
  // risky operation
} catch (error) {
  const appError = errorHandler.captureError(
    error,
    'toolConversion',
    { toolName: 'text-to-pdf' }
  );
}
```

---

## 4. Performance Monitoring

### 4.1 Web Vitals
Automatically tracked:
- **LCP** (Largest Contentful Paint): How fast content appears
- **FID** (First Input Delay): Responsiveness to user input
- **CLS** (Cumulative Layout Shift): Visual stability

### 4.2 Enable Performance Monitoring
```bash
PUBLIC_ENABLE_PERFORMANCE_MONITORING=true
```

### 4.3 View in Google Analytics
1. Go to Google Analytics
2. Reports → Engagement → Web Vitals
3. See performance metrics

---

## 5. Custom Tracking

### 5.1 Track Tool Conversions
```typescript
import { trackConversion } from '@/utils/analytics';

// After successful conversion
trackConversion(
  'pdf-to-text',      // tool name
  'pdf',              // input format
  'text',             // output format
  true,               // success boolean
  2500                // duration in milliseconds
);
```

### 5.2 Track Feature Usage
```typescript
import { trackFeatureUsage } from '@/utils/analytics';

trackFeatureUsage('export_button_clicked', {
  format: 'pdf',
  tool: 'text-to-pdf'
});
```

### 5.3 Track Errors
```typescript
import { trackError } from '@/utils/analytics';

trackError(
  'err_1234567890_abc',  // error ID
  'File too large',      // error message
  'fileUpload'           // context
);
```

---

## 6. Data Privacy

### 6.1 Google Analytics Privacy
- All IPs are anonymized
- Google Signals disabled
- Personalization disabled
- Respects Do Not Track (DNT)

### 6.2 Sentry Privacy
- No personal data captured
- No file content logged
- Error reports sanitized
- GDPR compliant

### 6.3 User Opt-Out
Users can:
- Disable cookies in browser settings
- Use privacy mode / incognito
- Install ad blockers
- Set DNT header

---

## 7. Monitoring Dashboard

### 7.1 Google Analytics Dashboard
Access at: https://analytics.google.com

**Key Reports:**
- Real-time users
- Tool usage by type
- Conversion rates
- User flow
- Device breakdown
- Geographic distribution

### 7.2 Sentry Dashboard
Access at: https://sentry.io

**Key Information:**
- Error frequency
- Error sources
- Release tracking
- Performance issues
- User feedback

---

## 8. Production Deployment

### 8.1 Pre-Deployment Checklist
- [ ] Google Analytics ID configured
- [ ] Sentry DSN configured (if using)
- [ ] Error reporting enabled
- [ ] Performance monitoring enabled
- [ ] Privacy policy updated
- [ ] Data handling documented

### 8.2 Environment Variables
```bash
# Production .env
PUBLIC_GA_ID=G_PRODUCTION_ID
PUBLIC_SENTRY_DSN=https://...prod...
PUBLIC_ENABLE_ANALYTICS=true
PUBLIC_ENABLE_ERROR_REPORTING=true
PUBLIC_ENABLE_PERFORMANCE_MONITORING=true
```

### 8.3 Verify Monitoring
1. Deploy to production
2. Generate some user activity
3. Wait 5 minutes
4. Check Google Analytics Real-time report
5. Verify data is flowing

---

## 9. Troubleshooting

### 9.1 Google Analytics Not Working
**Problem:** No data in Google Analytics  
**Solution:**
- Verify `PUBLIC_GA_ID` is set correctly
- Check browser console for errors
- Verify domain is added to GA allowed list
- Check if ad blocker is enabled

### 9.2 Sentry Not Reporting Errors
**Problem:** Errors not appearing in Sentry  
**Solution:**
- Verify `PUBLIC_SENTRY_DSN` is set correctly
- Check that Sentry initialization was called
- Errors might be caught before reaching Sentry
- Check Sentry project settings

### 9.3 Performance Metrics Missing
**Problem:** Web Vitals not appearing  
**Solution:**
- Performance monitoring must be enabled in production
- Metrics take time to accumulate
- Some metrics may not trigger on all pages
- Check browser PerformanceObserver support

---

## 10. Best Practices

### 10.1 Analytics
- Track meaningful events only
- Use consistent event naming
- Add context to events
- Monitor for spike in errors
- Review analytics weekly

### 10.2 Error Handling
- Provide user-friendly error messages
- Log errors with context
- Don't expose technical details to users
- Test error scenarios before deployment
- Monitor error rates

### 10.3 Performance
- Monitor Web Vitals regularly
- Alert on performance degradation
- Track conversion funnel
- Optimize slow pages
- Document performance targets

---

## 11. Compliance

### 11.1 GDPR
- Data processing documented ✓
- User consent obtained ✓
- Data retention policy defined ✓
- User rights implemented ✓

### 11.2 CCPA
- Privacy policy covers monitoring ✓
- Users can opt-out ✓
- Data deletion supported ✓

---

## 12. Contact & Support

For monitoring questions:
- **Email:** support@paperepair.com
- **Documentation:** /data-handling
- **Privacy:** /privacy

---

**Last Updated:** November 4, 2026
