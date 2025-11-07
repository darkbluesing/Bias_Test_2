import { test, expect } from '@playwright/test';

test.describe('Simple Page Load Test', () => {
  test.setTimeout(60000); // 1 minute timeout for this simple test

  test('should load the home page and check title', async ({ page }) => {
    console.log('Simple Test: Navigating to / ');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    console.log('Simple Test: Page loaded, checking title.');
    await expect(page).toHaveTitle(/편견 테스트/);
    console.log('Simple Test: Title check passed.');
  });
});
