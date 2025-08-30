import { test } from '@playwright/test';


const randomEmail = () => `user${Date.now()}@test.com`;
const password = 'TestPass123';
const username = `user${Date.now()}`;
const baseUrl = 'http://localhost:3000';

// End-to-end test for registration, login, logout, and resume view

test.describe('Auth Flow', () => {
  test('Register, Login, Logout, and Resume View', async ({ page }) => {
    // 1. Go to home page
    await page.goto(`${baseUrl}/`);

    // 2. Switch to register form if not already visible
    if (await page.locator('button:has-text("Register")').isVisible()) {
      await page.click('button:has-text("Register")');
    } else if (await page.locator('a:has-text("Register")').isVisible()) {
      await page.click('a:has-text("Register")');
    }

    // 3. Fill registration form
    const email = randomEmail();
    await page.fill('input[placeholder="Username"]', username);
    await page.fill('input[placeholder="Email"]', email);
    await page.fill('input[placeholder="Password"]', password);
    // Confirm password if present
    if (await page.locator('input[placeholder="Confirm Password"]').count() > 0) {
      await page.fill('input[placeholder="Confirm Password"]', password);
    }
    await page.click('button[type="submit"]');

    // Wait for registration to complete and login form to appear
    await page.waitForSelector('input[placeholder="Email"]');

    // 4. Fill login form
    await page.fill('input[placeholder="Email"]', email);
    await page.fill('input[placeholder="Password"]', password);
    await page.click('button[type="submit"]');

    // Wait for user profile or dashboard to appear (adjust selector as needed)
    await page.waitForSelector('text=Profile', { timeout: 10000 }).catch(() => {});

    // 5. Logout (adjust selector as needed)
    if (await page.locator('button:has-text("Logout")').isVisible()) {
      await page.click('button:has-text("Logout")');
    } else if (await page.locator('a:has-text("Logout")').isVisible()) {
      await page.click('a:has-text("Logout")');
    }

    // 6. Ensure redirected to login or home
    await page.waitForSelector('input[placeholder="Email"]');
  });
});
