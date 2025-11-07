import { test, expect } from '@playwright/test';

test('should navigate to Google', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
  await page.screenshot({ path: 'playwright-report/screenshots/google.png' });
});
