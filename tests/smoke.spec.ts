import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'language', {
      get: () => 'ko-KR'
    });
    Object.defineProperty(navigator, 'languages', {
      get: () => ['ko-KR']
    });
  });
});

test('basic smoke test', async ({ page }) => {
  // Navigate to the home page.
  await page.goto('/');

  // Check if the main title is visible.
  await expect(page.getByRole('heading', { name: 'My Unconscious Bias Test' })).toBeVisible();

  // Enter a name in the input field.
  await page.getByTestId('welcome-name-input').fill('Test User');

  // Find the start button by its test id and click it.
  await page.getByTestId('start-test-button').click();

  // Wait for navigation to the /test page.
  await page.waitForURL(/\/test\/?$/);

  // Check that the URL is correct.
  await expect(page).toHaveURL(/.*test/);

  // Check if the first question is rendered.
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('성별을 선택해주세요');
});
