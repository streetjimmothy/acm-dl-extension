// ACM Download Extension - Content Script
// This script automates the download process from ACM Digital Library

// Configuration - Hardcoded selectors for ACM DL
const CONFIG = {
  checkboxClass: 'checkbox-select',
  linkTitle: 'Download',
  buttonClass: 'download-button',
  retryDelay: 2000, // 2 seconds
  maxRetries: 3
};

class StatusDialog {
  private dialog: HTMLDivElement;

  constructor() {
    this.dialog = document.createElement('div');
    this.dialog.id = 'acm-dl-status-dialog';
    this.dialog.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      border: 2px solid #007acc;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 999999;
      min-width: 250px;
      font-family: Arial, sans-serif;
      font-size: 14px;
    `;
    document.body.appendChild(this.dialog);
  }

  updateStatus(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') {
    const colors = {
      info: '#007acc',
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107'
    };

    const icons = {
      info: '⏳',
      success: '✓',
      error: '✗',
      warning: '⚠'
    };

    this.dialog.style.borderColor = colors[type];
    this.dialog.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 20px;">${icons[type]}</span>
        <span style="color: #333;">${message}</span>
      </div>
    `;
  }

  remove() {
    this.dialog.remove();
  }
}

class ACMDownloadAutomation {
  private statusDialog: StatusDialog;

  constructor() {
    this.statusDialog = new StatusDialog();
  }

  async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async run() {
    try {
      // Step 1: Check all checkboxes
      await this.checkCheckboxes();
      await this.delay(500);

      // Step 2: Click the download link
      await this.clickDownloadLink();
      await this.delay(500);

      // Step 3: Click the download button
      await this.clickDownloadButton();

      // Success!
      this.statusDialog.updateStatus('All steps completed successfully!', 'success');
      await this.delay(3000);
      this.statusDialog.remove();
    } catch (error) {
      this.statusDialog.updateStatus(`Error: ${error}`, 'error');
      await this.delay(5000);
      this.statusDialog.remove();
    }
  }

  async checkCheckboxes(): Promise<void> {
    this.statusDialog.updateStatus('Step 1/3: Checking checkboxes...', 'info');

    for (let attempt = 1; attempt <= CONFIG.maxRetries; attempt++) {
      try {
        const checkboxes = document.querySelectorAll<HTMLInputElement>(
          `input[type="checkbox"].${CONFIG.checkboxClass}`
        );

        if (checkboxes.length === 0) {
          throw new Error(`No checkboxes found with class "${CONFIG.checkboxClass}"`);
        }

        let checkedCount = 0;
        checkboxes.forEach(checkbox => {
          if (!checkbox.checked) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            checkedCount++;
          }
        });

        this.statusDialog.updateStatus(
          `Step 1/3: Checked ${checkedCount} checkbox(es)`,
          'success'
        );
        return;
      } catch (error) {
        if (attempt < CONFIG.maxRetries) {
          this.statusDialog.updateStatus(
            `Step 1/3: Retry ${attempt}/${CONFIG.maxRetries}...`,
            'warning'
          );
          await this.delay(CONFIG.retryDelay);
        } else {
          throw error;
        }
      }
    }
  }

  async clickDownloadLink(): Promise<void> {
    this.statusDialog.updateStatus('Step 2/3: Looking for download link...', 'info');

    for (let attempt = 1; attempt <= CONFIG.maxRetries; attempt++) {
      try {
        const link = document.querySelector<HTMLAnchorElement>(
          `a[title="${CONFIG.linkTitle}"]`
        );

        if (!link) {
          throw new Error(`No link found with title "${CONFIG.linkTitle}"`);
        }

        link.click();
        this.statusDialog.updateStatus('Step 2/3: Download link clicked', 'success');
        return;
      } catch (error) {
        if (attempt < CONFIG.maxRetries) {
          this.statusDialog.updateStatus(
            `Step 2/3: Retry ${attempt}/${CONFIG.maxRetries}...`,
            'warning'
          );
          await this.delay(CONFIG.retryDelay);
        } else {
          throw error;
        }
      }
    }
  }

  async clickDownloadButton(): Promise<void> {
    this.statusDialog.updateStatus('Step 3/3: Looking for download button...', 'info');

    for (let attempt = 1; attempt <= CONFIG.maxRetries; attempt++) {
      try {
        const button = document.querySelector<HTMLButtonElement>(
          `button.${CONFIG.buttonClass}`
        );

        if (!button) {
          throw new Error(`No button found with class "${CONFIG.buttonClass}"`);
        }

        button.click();
        this.statusDialog.updateStatus('Step 3/3: Download button clicked', 'success');
        return;
      } catch (error) {
        if (attempt < CONFIG.maxRetries) {
          this.statusDialog.updateStatus(
            `Step 3/3: Retry ${attempt}/${CONFIG.maxRetries}...`,
            'warning'
          );
          await this.delay(CONFIG.retryDelay);
        } else {
          throw error;
        }
      }
    }
  }
}

// Initialize and run the automation when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const automation = new ACMDownloadAutomation();
    automation.run();
  });
} else {
  const automation = new ACMDownloadAutomation();
  automation.run();
}
