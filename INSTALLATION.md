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

