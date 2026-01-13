# ACM Download Extension

A Chromium extension written in TypeScript that automates the download process from the ACM Digital Library.

## Features

The extension automatically performs the following tasks when visiting ACM Digital Library pages:

1. **Check Checkboxes**: Finds and checks all checkbox elements with the class `checkbox-select`
2. **Click Download Link**: Locates and clicks an anchor element with the title "Download"
3. **Click Download Button**: Finds and clicks the first button with the class `download-button`

Each step displays a status dialog showing the current progress. If any step fails, the extension will automatically retry after a short delay (2 seconds, up to 3 attempts).

## Installation

### Building from Source

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the extension:
   ```bash
   npm run build
   ```

3. Load the extension in Chrome/Chromium:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the `dist` folder from this project

## Usage

Once installed, the extension will automatically run on ACM Digital Library pages (`https://dl.acm.org/*`). 

A status dialog will appear in the top-right corner of the page showing:
- Current step being executed
- Success/error messages
- Retry attempts if needed

## Configuration

The extension uses hardcoded selectors that can be customized in `src/content.ts`:

```typescript
const CONFIG = {
  checkboxClass: 'checkbox-select',  // CSS class for checkboxes
  linkTitle: 'Download',              // Title attribute for download link
  buttonClass: 'download-button',     // CSS class for download button
  retryDelay: 2000,                   // Delay between retries (ms)
  maxRetries: 3                       // Maximum retry attempts
};
```

## Development

- **Watch mode**: `npm run watch` - Automatically recompiles TypeScript on changes
- **Clean build**: `npm run clean && npm run build` - Remove old build and create fresh one

## Technical Details

- **Language**: TypeScript
- **Target**: ES2020
- **Manifest Version**: 3 (Chrome Extension Manifest V3)
- **Permissions**: 
  - `activeTab`: Access to current tab
  - `scripting`: Ability to inject scripts
  - Host permission for `https://dl.acm.org/*`

## License

MIT
