import { test, expect } from '@playwright/test';

test.describe('Content Validation', () => {
  test('hero tagline is correct', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('The future, on demand.')).toBeVisible();
  });

  test('hero subtitle is correct', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('I build AI infrastructure that gives one person the output of an engineering team.')).toBeVisible();
  });

  test('hermos page shows stats', async ({ page }) => {
    await page.goto('/hermos');
    await expect(page.getByText('Documents indexed', { exact: true })).toBeVisible();
    await expect(page.getByText('Automation workflows', { exact: true })).toBeVisible();
    await expect(page.getByText('AI tools per session', { exact: true })).toBeVisible();
  });

  test('hermos page shows security section', async ({ page }) => {
    await page.goto('/hermos');
    await expect(page.getByText('Security-audited from day one')).toBeVisible();
  });

  test('about page shows prior projects', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText('LumaCharts Pro').first()).toBeVisible();
    await expect(page.getByText('U.S. Fiscal Health Dashboard').first()).toBeVisible();
    await expect(page.getByText('Market Analysis Tool').first()).toBeVisible();
    await expect(page.getByText('Portfolio Optimizer').first()).toBeVisible();
  });

  test('about page shows bio', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText('Baylor MIS student')).toBeVisible();
  });
});
