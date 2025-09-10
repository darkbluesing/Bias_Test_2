import { test, expect } from '@playwright/test';

test('basic smoke test', async ({ page }) => {
  // Navigate to the home page.
  await page.goto('/');

  // Check if the main title is visible.
  await expect(page.getByRole('heading', { name: 'My Unconscious Bias Test' })).toBeVisible();

  // Enter a name in the input field.
  await page.getByPlaceholder('이름 또는 닉네임을 입력하세요').fill('Test User');

  // Find the start button by its test id and click it.
  await page.getByTestId('start-test-button').click();

  // Wait for navigation to the /test page.
  await page.waitForURL('**/test');

  // Check that the URL is correct.
  await expect(page).toHaveURL(/.*test/);

  // Check if the first question is rendered.
  await expect(page.locator('h2')).toContainText('당신은 다음 중 어떤 세대이신가요?');
});
