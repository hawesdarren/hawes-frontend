import { test, expect } from '@playwright/test';
import { AlertsPage } from './pom/alerts';

test.describe('Alerts Tests', () => {
    let alertsPage: AlertsPage;

test.beforeEach(async ({ page }) => {
    alertsPage = new AlertsPage(page);
    await page.goto('/public/alerts');
    // Expect page title to be Alerts
    await expect(alertsPage.heading).toBeVisible();
    // Expect Challenge to be visible
    await expect(alertsPage.challenge).toBeVisible();
});

test('Show alert and confirm', async ({ page }) => {
    // Click on Show Alert button
    await alertsPage.alertButton.click();
    // Expect alert box to be visible
    await expect(alertsPage.alertBox).toBeVisible();
    // Expect alert title to be correct
    await expect(alertsPage.alertTitle).toHaveText('Are you absolutely sure?');
    // Expect alert message to be correct
    await expect(alertsPage.alertMessage).toHaveText('This action cannot be undone. This will permanently delete your account and remove your data from our servers.');
    // Click on Confirm button
    await alertsPage.alertConfirmButton.click();
    // Expect alert box to be hidden
    await expect(alertsPage.alertBox).toBeHidden();
    // Expect action result to be true
    await expect(alertsPage.alertActionResult).toHaveText('Action: true');
});

test('Show alert and cancel', async ({ page }) => {
    // Click on Show Alert button
    await alertsPage.alertButton.click();
    // Expect alert box to be visible
    await expect(alertsPage.alertBox).toBeVisible();
    // Click on Cancel button
    await alertsPage.alertCloseButton.click();
    // Expect alert box to be hidden
    await expect(alertsPage.alertBox).toBeHidden();
    // Expect action result to be false
    await expect(alertsPage.alertActionResult).toHaveText('Action: false');
});

test('Alert box keyboard navigation', async ({ page }) => {
    // Click on Show Alert button
    await alertsPage.alertButton.click();
    // Expect alert box to be visible
    await expect(alertsPage.alertBox).toBeVisible();
    // Expect Cancel button to be focused initially
    await expect(alertsPage.alertCloseButton).toBeFocused();
    // Press Tab to go to Confirm button
    await page.keyboard.press('Tab');
    await expect(alertsPage.alertConfirmButton).toBeFocused();
    // Press Shift+Tab to go back to Continue button
    await page.keyboard.press('Shift+Tab');
    await expect(alertsPage.alertCloseButton).toBeFocused();
    // Press Escape to close the alert
    await page.keyboard.press('Escape');
    // Expect alert box to be hidden
    await expect(alertsPage.alertBox).toBeHidden(); 
});

test('Sonner alert appears on button click', async ({ page }) => {
    // Click on Show Success Alert button
    await alertsPage.sonnerAlertButton.click();
    // Expect sonner alert box to be visible
    await expect(alertsPage.sonnerAlertBox).toBeVisible();
    // Expect sonner alert message to be correct
    await expect(alertsPage.sonnerAlertMessage).toHaveText('This is a success alert!'); 
});

});