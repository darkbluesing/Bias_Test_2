import { test, expect, Page } from '@playwright/test';

test.describe('Adsterra Banner Diagnosis', () => {
  test.setTimeout(60000); // Set timeout for the entire describe block
  let page: Page;
  const consoleLogs: string[] = [];
  const pageErrors: string[] = [];

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    page.on('console', (msg) => {
      consoleLogs.push(`CONSOLE ${msg.type().toUpperCase()}: ${msg.text()}`);
    });
    page.on('pageerror', (err) => {
      pageErrors.push(`PAGE ERROR: ${err.message}`);
    });
  });

  test.afterEach(async () => {
    console.log('\n--- AdsterraBanner Console Logs ---');
    consoleLogs.forEach(log => console.log(log));
    console.log('\n--- AdsterraBanner Page Errors ---');
    pageErrors.forEach(error => console.error(error));
    consoleLogs.length = 0; // Clear for next test
    pageErrors.length = 0; // Clear for next test
    await page.close();
  });

  async function checkAdBanner(page: Page, pageName: string) {
    console.log(`\n--- Checking Adsterra Banner on ${pageName} ---`);
    const bannerContainer = page.locator('div[data-adsterra-fallback]').first();
    const bannerExists = await bannerContainer.isVisible();
    console.log(`AdsterraBanner: Banner container visible on ${pageName}: ${bannerExists}`);

    if (bannerExists) {
      const innerHTML = await bannerContainer.innerHTML();
      console.log(`AdsterraBanner: Banner container innerHTML on ${pageName}: ${innerHTML.substring(0, 500)}...`);
      await expect(bannerContainer).toContainText(/Loading ad|Checking inventory|Ad failed to load/);
      const childrenCount = await bannerContainer.evaluate(el => el.children.length);
      console.log(`AdsterraBanner: Banner container children count on ${pageName}: ${childrenCount}`);
    } else {
      console.log(`AdsterraBanner: Banner container NOT found or not visible on ${pageName}.`);
    }
    await page.screenshot({ path: `playwright-report/screenshots/adsterra-${pageName}.png` });
  }

  test('should diagnose Adsterra banner on home page', async () => {
    test.setTimeout(60000); // Set timeout for individual test
    await page.goto('/');
    await page.waitForLoadState('networkidle'); // Wait for the page to be fully loaded
    await checkAdBanner(page, 'Home Page');
  });

  test('should diagnose Adsterra banner on test page', async () => {
    test.setTimeout(60000); // Set timeout for individual test
    await page.goto('/');
    await page.waitForLoadState('networkidle'); // Wait for the page to be fully loaded
    // Simulate starting the test to navigate to /test
    await page.getByTestId('welcome-name-input').fill('Test User');
    await page.getByTestId('start-test-button').click();
    await page.waitForURL(/\/test\/?$/);
    await page.waitForLoadState('networkidle'); // Wait for the page to be fully loaded
    await checkAdBanner(page, 'Test Page');
  });

  test('should diagnose Adsterra banner on result page', async () => {
    test.setTimeout(60000); // Set timeout for individual test
    await page.goto('/');
    await page.waitForLoadState('networkidle'); // Wait for the page to be fully loaded
    // Simulate completing the test to navigate to /result
    await page.getByTestId('welcome-name-input').fill('Test User');
    await page.getByTestId('start-test-button').click();
    await page.waitForURL(/\/test\/?$/);
    await page.waitForLoadState('networkidle'); // Wait for the page to be fully loaded

    // Answer all questions to reach the result page
    for (let i = 0; i < 10; i++) { // Assuming 10 questions for now
      await page.click('button:has-text("매우 동의")'); // Select first option for simplicity
      await page.waitForTimeout(200); // Small delay for state update
    }
    await page.waitForURL(/\/result\/?$/);
    await page.waitForLoadState('networkidle'); // Wait for the page to be fully loaded
    await checkAdBanner(page, 'Result Page');
  });
});
