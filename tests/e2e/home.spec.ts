import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads and shows hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Newpod/);
    await expect(page.locator('nav')).toBeVisible();
  });

  test('navigation links are visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /Ofertă/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Servicii/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Contact/i })).toBeVisible();
  });

  test('quote form is present', async ({ page }) => {
    await page.goto('/#oferta');
    await expect(page.getByRole('heading', { name: /Energie solară/i })).toBeVisible();
    await expect(page.getByLabel(/Nume/i).first()).toBeVisible();
  });

  test('cookie banner appears', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('newpod_cookie_consent'));
    await page.goto('/');
    await expect(page.getByRole('region', { name: /Cookie/i })).toBeVisible();
  });

  test('cookie banner disappears after accepting', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('newpod_cookie_consent'));
    await page.goto('/');
    await page.getByRole('button', { name: /Accept/i }).click();
    await expect(page.getByRole('region', { name: /Cookie/i })).not.toBeVisible();
  });

  test('FAQ accordion expands', async ({ page }) => {
    await page.goto('/#intrebari');
    const firstQuestion = page.locator('button[aria-expanded]').first();
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
  });

  test('404 page is rendered for unknown routes', async ({ page }) => {
    await page.goto('/ruta-inexistenta-xyz');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Înapoi acasă/i })).toBeVisible();
  });

  test('admin route renders auth form', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('newpod_admin_token'));
    await page.goto('/admin');
    await expect(page.getByText(/Admin/i)).toBeVisible();
    await expect(page.getByLabel(/Utilizator/i)).toBeVisible();
  });
});
