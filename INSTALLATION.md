# Installation Guide

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Chrome, Chromium, or any Chromium-based browser (Edge, Brave, etc.)

## Building the Extension

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/streetjimmothy/acm-dl-extension.git
   cd acm-dl-extension
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the extension**:
   ```bash
   npm run build
   ```

   This will:
   - Clean the `dist` directory
   - Compile TypeScript to JavaScript
   - Copy all necessary files to the `dist` directory

## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`

2. Enable **Developer mode** by toggling the switch in the top right corner

3. Click **Load unpacked**

4. Navigate to and select the `dist` folder inside the project directory

5. The extension should now appear in your extensions list with the ACM Download Extension icon

## Verifying Installation

Once loaded, you should see:
- Extension name: "ACM Download Extension"
- Version: 1.0.0
- A blue download arrow icon

## Using the Extension

1. Navigate to any ACM Digital Library page: `https://dl.acm.org/*`

2. The extension will automatically run and display a status dialog in the top-right corner

3. Watch as it progresses through the three steps:
   - Step 1/3: Checking checkboxes
   - Step 2/3: Clicking download link
   - Step 3/3: Clicking download button

## Testing Locally

A test page is included (`test-page.html`) that simulates the ACM DL page structure:

1. Open `test-page.html` in your browser
2. Manually trigger the extension or test individual elements
3. Monitor the activity log to see what actions are being performed

**Note**: The extension is configured to only auto-run on `https://dl.acm.org/*` URLs. For the test page, you would need to manually test the elements or temporarily modify the manifest.json.

## Troubleshooting

### Extension doesn't appear
- Make sure you selected the `dist` folder, not the root project folder
- Check that all files were built successfully by running `npm run build` again

### Extension doesn't run on ACM pages
- Check the browser console (F12) for any error messages
- Verify the page URL matches `https://dl.acm.org/*`
- Make sure the extension is enabled in `chrome://extensions/`

### Elements not found
The extension uses these hardcoded selectors (can be modified in `src/content.ts`):
- Checkboxes: `input[type="checkbox"].checkbox-select`
- Link: `a[title="Download"]`
- Button: `button.download-button`

If the ACM DL structure has changed, you may need to update these selectors.

## Customizing Selectors

1. Edit `src/content.ts` and modify the `CONFIG` object:
   ```typescript
   const CONFIG = {
     checkboxClass: 'your-checkbox-class',
     linkTitle: 'Your Link Title',
     buttonClass: 'your-button-class',
     retryDelay: 2000,
     maxRetries: 3
   };
   ```

2. Rebuild the extension:
   ```bash
   npm run build
   ```

3. Reload the extension in Chrome:
   - Go to `chrome://extensions/`
   - Click the reload icon on the ACM Download Extension card

## Development Mode

For active development, use watch mode to automatically recompile on changes:

```bash
npm run watch
```

Then reload the extension in Chrome after each change.
