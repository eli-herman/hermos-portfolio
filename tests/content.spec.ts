import { test, expect } from '@playwright/test';

test.describe('Content Validation', () => {
  test.skip('hero tagline is correct', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('The future, on demand.')).toBeVisible();
  });

  test.skip('hero subtitle is correct', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('I build AI infrastructure that gives one person the output of an engineering team.')).toBeVisible();
  });

  test.skip('hermos page shows stats', async ({ page }) => {
    await page.goto('/hermos');
    await expect(page.getByText('Documents indexed')).toBeVisible();
    await expect(page.getByText('Automation workflows')).toBeVisible();
    await expect(page.getByText('AI tools per session')).toBeVisible();
  });

  test.skip('hermos page shows security section', async ({ page }) => {
    await page.goto('/hermos');
    await expect(page.getByText('Security-audited from day one')).toBeVisible();
  });

  test.skip('about page shows prior projects', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText('LumaCharts Pro')).toBeVisible();
    await expect(page.getByText('U.S. Fiscal Health Dashboard')).toBeVisible();
    await expect(page.getByText('Market Analysis Tool')).toBeVisible();
    await expect(page.getByText('Portfolio Optimizer')).toBeVisible();
  });

  test.skip('about page shows bio', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText('Baylor MIS student')).toBeVisible();
  });
});
