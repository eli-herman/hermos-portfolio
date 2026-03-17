import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Eli Herman/);
  });

  test('hermos page loads', async ({ page }) => {
    await page.goto('/hermos');
    await expect(page).toHaveTitle(/Hermos/);
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveTitle(/About/);
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/hermos"]');
    await expect(page).toHaveURL(/hermos/);
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL(/about/);
    await page.click('a[href="/"]');
    await expect(page).toHaveURL(/\/$/);
  });

  test('contact section exists', async ({ page }) => {
    await page.goto('/');
    const contact = page.locator('#contact');
    await expect(contact).toBeVisible();
  });
});
