import { test, expect } from '@playwright/test';

test('Home page elements visible', async ({ page }) => {
  await page.goto('/');

  // Expect logo to be visible
  await expect(page.getByRole('img', { name: 'Hawes logo' })).toBeVisible();
  // Expect Hamburger menu to be visible
  await expect(page.getByRole('img', { name: 'menu' })).toBeVisible();
  // Expect dark mode toggle to be visible
  await expect(page.locator('#darkModeToggle')).toBeVisible();
});

test('Home page - Dark mode toggle works', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => document.documentElement.classList.remove('dark')); // Ensure dark mode is off initially
    // Click on the dark mode toggle
    await page.locator('#darkModeToggle').click();
    // Check if the dark mode class is added to the document element
    const isDarkMode = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDarkMode).toBe(true);
    // Check if the toggle icon changes back to light mode icon
    expect(await page.locator('#darkModeToggle').innerHTML()).toContain('\u263C'); // This is the Unicode for the sun icon
    // Click again to toggle back to light mode
    await page.locator('#darkModeToggle').click();
    // Check if the dark mode class is removed from the document element
    const isLightMode = await page.evaluate(() => !document.documentElement.classList.contains('dark'));
    expect(isLightMode).toBe(true);
    // Check if the toggle icon changes back to dark mode icon
    expect(await page.locator('#darkModeToggle').innerHTML()).toContain('\u263D'); // This is the Unicode for the moon icon
});

test('Home page - Hamburger menu opens and closes', async ({ page }) => {
    await page.goto('/');
    // Click on the hamburger menu
    await page.getByRole('img', { name: 'menu' }).click();
    // Check if the menu is visible
    await expect(page.locator('#hamburgerMenuItems')).toBeVisible();
    // Click again to close the menu
    await page.getByRole('img', { name: 'menu' }).click();
    // Check if the menu is no longer visible
    await expect(page.locator('hamburgerMenuItems')).toBeHidden();
    // Check if the menu button is still visible
    await expect(page.getByRole('img', { name: 'menu' })).toBeVisible();
    // Check if the menu closes when clicking outside
    await page.getByRole('img', { name: 'menu' }).click();
    await expect(page.locator('#hamburgerMenuItems')).toBeVisible();
    await page.click('body'); // Click outside the menu
    // Check if the menu is no longer visible
    await expect(page.locator('#hamburgerMenuItems')).toBeHidden();

    // Check if the menu button is still enabled
    const isMenuButtonEnabled = await page.getByRole('img', { name: 'menu' }).isEnabled();
    expect(isMenuButtonEnabled).toBe(true);
});