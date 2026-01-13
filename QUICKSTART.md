# Quick Start Guide

## TL;DR

1. Install dependencies: `npm install`
2. Build extension: `npm run build`
3. Load `dist` folder in Chrome at `chrome://extensions/`
4. Visit ACM Digital Library pages

## What the Extension Does

The extension automatically:
1. ✅ Checks all checkboxes with class `checkbox-select`
2. ✅ Clicks the link with title "Download"
3. ✅ Clicks the button with class `download-button`

## Visual Workflow

```
┌─────────────────────────────────────────────┐
│  ACM Digital Library Page Opens             │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  Extension Status Dialog Appears            │
│  (Top-right corner)                         │
│  ⏳ Step 1/3: Checking checkboxes...        │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  All checkboxes get checked                 │
│  ✓ Step 1/3: Checked X checkbox(es)        │
└─────────────────┬───────────────────────────┘
                  │
                  ▼ (500ms delay)
┌─────────────────────────────────────────────┐
│  Download link is found and clicked         │
│  ⏳ Step 2/3: Looking for download link... │
│  ✓ Step 2/3: Download link clicked         │
└─────────────────┬───────────────────────────┘
                  │
                  ▼ (500ms delay)
┌─────────────────────────────────────────────┐
│  Download button is found and clicked       │
│  ⏳ Step 3/3: Looking for download button...│
│  ✓ Step 3/3: Download button clicked       │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  Success!                                   │
│  ✓ All steps completed successfully!       │
│  (Dialog auto-closes after 3 seconds)      │
└─────────────────────────────────────────────┘
```

## Status Dialog Colors

- **Blue (⏳)**: Processing/In Progress
- **Green (✓)**: Success
- **Yellow (⚠)**: Retrying
- **Red (✗)**: Error

## Retry Logic

If any step fails:
- Extension waits 2 seconds
- Retries up to 3 times
- Shows retry count: "Retry 1/3", "Retry 2/3", etc.
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

## Troubleshooting

### Extension doesn't load
- Make sure you selected the `dist` folder, not the root
- Check that `npm run build` completed successfully

### Extension doesn't run
- Verify you're on a `https://dl.acm.org/*` page
- Check browser console (F12) for errors
- Make sure extension is enabled in `chrome://extensions/`

### Elements not found
- The selectors may need updating
- Check the actual page HTML for correct classes/titles
- Update `CONFIG` in `src/content.ts` as needed

## File Structure

```
acm-dl-extension/
├── src/
│   └── content.ts          ← Main extension logic
├── dist/                   ← Built extension (load this)
│   ├── content.js
│   ├── manifest.json
│   ├── popup.html
│   ├── styles.css
│   └── icons/
├── manifest.json           ← Extension configuration
├── popup.html              ← Extension popup UI
├── package.json            ← NPM configuration
├── tsconfig.json           ← TypeScript config
└── test-page.html          ← Local test page
```

## Need Help?

1. Check `INSTALLATION.md` for detailed setup
2. Check `FEATURES.md` for technical details
3. Check `SUMMARY.md` for project overview
4. Open an issue on GitHub

## License

MIT - See LICENSE file
