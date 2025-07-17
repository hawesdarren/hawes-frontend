import { test, expect } from '@playwright/test';
import { Homepage } from './pom/homepage';
import { HamburgerMenu } from './pom/hamburger';

test.describe('Home Page Tests', () => {
  let homepage: Homepage;
  let hamburgerMenu: HamburgerMenu;

test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    hamburgerMenu = new HamburgerMenu(page);
    await page.goto('/');
    // Expect logo to be visible
    await expect(homepage.logo).toBeVisible();
    // Expect Hamburger menu to be visible
    await expect(homepage.hamburger).toBeVisible();
    // Expect dark mode toggle to be visible
    await expect(homepage.darkModeToggle).toBeVisible();
});


test('Dark mode toggle works', async ({ page }) => {

    await page.evaluate(() => document.documentElement.classList.remove('dark')); // Ensure dark mode is off initially
    // Click on the dark mode toggle
    await homepage.darkModeToggle.click();
    // Check if the dark mode class is added to the document element
    const isDarkMode = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDarkMode).toBe(true);
    // Check if the toggle icon changes back to light mode icon
    expect(await homepage.darkModeToggle.innerHTML()).toContain('\u263C'); // This is the Unicode for the sun icon
    // Click again to toggle back to light mode
    await homepage.darkModeToggle.click();
    // Check if the dark mode class is removed from the document element
    const isLightMode = await page.evaluate(() => !document.documentElement.classList.contains('dark'));
    expect(isLightMode).toBe(true);
    // Check if the toggle icon changes back to dark mode icon
    expect(await homepage.darkModeToggle.innerHTML()).toContain('\u263D'); // This is the Unicode for the moon icon
});

test('Hamburger menu opens and closes', async ({ page }) => {
    
    // Click on the hamburger menu
    await hamburgerMenu.hamburger.click();
    // Check if the menu is visible
    await expect(hamburgerMenu.hamburgerMenuItems).toBeVisible();
    // Click again to close the menu
    await hamburgerMenu.hamburger.click();
    // Check if the menu is no longer visible
    await expect(hamburgerMenu.hamburgerMenuItems).toBeHidden();
    // Check if the menu button is still visible
    await expect(hamburgerMenu.hamburger).toBeVisible();
    // Check if the menu closes when clicking outside
    await hamburgerMenu.hamburger.click();
    await expect(hamburgerMenu.hamburgerMenuItems).toBeVisible();
    await page.click('body'); // Click outside the menu
    // Check if the menu is no longer visible
    await expect(hamburgerMenu.hamburgerMenuItems).toBeHidden();

    // Check if the menu button is still enabled
    const isMenuButtonEnabled = await hamburgerMenu.hamburger.isEnabled();
    expect(isMenuButtonEnabled).toBe(true);
});
});