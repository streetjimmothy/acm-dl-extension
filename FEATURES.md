# ACM Download Extension - Features Overview

## Key Features

### 1. Automated DOM Manipulation
The extension automatically performs three sequential tasks:

#### Task 1: Checkbox Selection
- **Selector**: `input[type="checkbox"].checkbox-select`
- **Action**: Finds all matching checkboxes and checks them
- **Event**: Dispatches 'change' event for each checkbox

#### Task 2: Download Link Click
- **Selector**: `a[title="Download"]`
- **Action**: Simulates a click on the matching anchor element

#### Task 3: Download Button Click
- **Selector**: `button.download-button`
- **Action**: Simulates a click on the first matching button element

### 2. Status Dialog
A floating dialog appears in the top-right corner showing:
- Current step being executed (Step 1/3, 2/3, 3/3)
- Success/error indicators with color coding
- Retry attempts when failures occur
- Auto-dismissal after completion

**Status Types**:
- ⏳ **Info** (Blue): Process in progress
- ✓ **Success** (Green): Step completed successfully
- ⚠ **Warning** (Yellow): Retrying after failure
- ✗ **Error** (Red): Step failed after all retries

### 3. Retry Mechanism
Each step includes automatic retry logic:
- **Max Retries**: 3 attempts per step
- **Retry Delay**: 2 seconds between attempts
- **Smart Retry**: Only retries on failure, not on success

### 4. Configuration
All selectors and timing can be customized in `src/content.ts`:

```typescript
const CONFIG = {
  checkboxClass: 'checkbox-select',  // Default checkbox class
  linkTitle: 'Download',              // Default link title
  buttonClass: 'download-button',     // Default button class
  retryDelay: 2000,                   // 2 seconds
  maxRetries: 3                       // 3 attempts
};
```

## Technical Implementation

### Architecture
- **Language**: TypeScript (compiled to ES2020 JavaScript)
- **Manifest**: Chrome Extension Manifest V3
- **Injection**: Content script runs at `document_idle`
- **Permissions**: `activeTab`, `scripting`, and host permission for ACM DL

### Class Structure

```
StatusDialog
├── dialog (HTMLDivElement)
├── updateStatus(message, type)
└── remove()

ACMDownloadAutomation
├── statusDialog (StatusDialog)
├── retryCount (number)
├── delay(ms)
├── run()
├── checkCheckboxes()
├── clickDownloadLink()
└── clickDownloadButton()
```

### Execution Flow

```
Page Load
    ↓
Check if document ready
    ↓
Initialize ACMDownloadAutomation
    ↓
Create StatusDialog
    ↓
┌─────────────────┐
│ Step 1: Check   │
│ all checkboxes  │ ← Retry on failure (3x)
└────────┬────────┘
         ↓ (500ms delay)
┌─────────────────┐
│ Step 2: Click   │
│ download link   │ ← Retry on failure (3x)
└────────┬────────┘
         ↓ (500ms delay)
┌─────────────────┐
│ Step 3: Click   │
│ download button │ ← Retry on failure (3x)
└────────┬────────┘
         ↓
Show success (3s)
    ↓
Remove dialog
```

## Browser Compatibility

The extension is compatible with:
- ✓ Google Chrome (v88+)
- ✓ Microsoft Edge (v88+)
- ✓ Brave Browser
- ✓ Opera (v74+)
- ✓ Any Chromium-based browser supporting Manifest V3

## Security & Privacy

- **No External Requests**: Extension operates entirely client-side
- **Limited Permissions**: Only accesses ACM Digital Library pages
- **No Data Collection**: No user data is collected or transmitted
- **Open Source**: Full source code available for audit

## Development Workflow

1. **Edit Source**: Modify `src/content.ts`
2. **Compile**: Run `npm run build` or `npm run watch`
3. **Reload**: Refresh extension in `chrome://extensions/`
4. **Test**: Navigate to ACM DL page or use test-page.html

## Error Handling

The extension includes comprehensive error handling:
- Element not found errors with descriptive messages
- Automatic retry with exponential backoff
- User-friendly error messages in status dialog
- Graceful failure without breaking page functionality
