# Quick Start Guide

## TL;DR

1. Install dependencies: `npm install`
2. Build extension: `npm run build`
3. Load `dist` folder in Chrome at `chrome://extensions/`
4. Visit ACM Digital Library pages


## Status Dialog Colors

- **Blue (⏳)**: Processing/In Progress
- **Green (✓)**: Success
- **Yellow (⚠)**: Retrying
- **Red (✗)**: Error

## Retry Logic

If any step fails:
- Extension waits 2 seconds
- Retries up to 3 times
- After 3 failures, shows error message

## Customization

Edit `src/content.ts` to change selectors:

```typescript
const CONFIG = {
  checkboxClass: 'checkbox-select',    // ← Change this
  linkTitle: 'Download',                // ← Or this
  buttonClass: 'download-button',       // ← Or this
  retryDelay: 2000,                     // ← Delay in milliseconds
  maxRetries: 3                         // ← Number of retries
};
```

Then rebuild: `npm run build`