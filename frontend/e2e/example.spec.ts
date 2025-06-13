import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('view proyect documentation', async ({ page }) => {
  await page.goto('http://localhost:3001/documentation/6840b3234d37db46a9adf558/TYPESCRIPT');

  await page.waitForTimeout(3000);

  const code = page.locator('text=RepositoryModel');

  await expect(code).toBeVisible();
});

test('check auth page loads', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await expect(page).toHaveTitle(/Just Doc It/);
});

test('check not found page', async ({ page }) => {
  await page.goto('http://localhost:3001/nonexistent-page');
  await expect(page.getByText(/404/)).toBeVisible();
});

test('check dashboard route exists', async ({ page }) => {
  await page.goto('http://localhost:3001/dashboard');
  await expect(page).toHaveURL(/.*dashboard/);
});

test('check documentation route exists', async ({ page }) => {
  await page.goto('http://localhost:3001/documentation/123/typescript');
  await expect(page).toHaveURL(/.*documentation/);
});