import { test, expect } from '@playwright/test';
import { Spinner } from './pom/spinner';
import { LoadingPage } from './pom/loadingPage';

test.describe('Spinner Tests', () => {
    let spinnerPage: Spinner;
    let loadingPage: LoadingPage;

    test.beforeEach(async ({ page }) => {
        spinnerPage = new Spinner(page);
        loadingPage = new LoadingPage(page);
        await page.goto('/public/spinner');
        // Expect page title to be Spinner
        await expect(spinnerPage.saveButton).toBeVisible();
        // Expect Challenge to be visible
        await expect(spinnerPage.loadPageButton).toBeVisible();
    });

    test('Save spinner displayed', async ({ page }) => {
        // Click on Save button - should show spinner
        await spinnerPage.saveButton.click();
        // Expect spinner to be visible
        await expect(spinnerPage.saveButtonSpinner).toBeVisible();
        // Button text changed to Saving...
        await expect(spinnerPage.saveButton).toHaveText('Saving...');
        // Wait for 12 seconds to allow save to complete
        await page.waitForTimeout(12000);
        // Expect spinner to be hidden
        await expect(spinnerPage.saveButtonSpinner).toBeHidden();
        // Button text changed back to Save
        await expect(spinnerPage.saveButton).toHaveText('Save');

    });

    test("Save spinner accessibility attributes", async ({ page }) => {
        // Click on Save button - should show spinner
        await spinnerPage.saveButton.click();
        // Expect aria-busy to be true
        await expect(spinnerPage.saveButton).toHaveAttribute('aria-busy', 'true');
        // Expect aria-disabled to be true
        await expect(spinnerPage.saveButton).toHaveAttribute('aria-disabled', 'true');
        // Wait for 12 seconds to allow save to complete
        await page.waitForTimeout(12000);
        // Expect aria-busy to be false
        await expect(spinnerPage.saveButton).toHaveAttribute('aria-busy', 'false');
        // Expect aria-disabled to be false
        await expect(spinnerPage.saveButton).toHaveAttribute('aria-disabled', 'false');
    });

    test('Load next page spinner displayed and accessibility attributes', async ({ page }) => {
        // Click on Load Next Page button
        await spinnerPage.loadPageButton.click();
        // Expect loading spinner to be visible on loading page
        await expect(loadingPage.spinner).toBeVisible();
        // Check that spinner has aria-lable="loading" for accessibility
        await expect(loadingPage.spinner).toHaveAttribute('aria-label', 'Loading');
        // Wait for 12 seconds to allow loading to complete
        await page.waitForTimeout(12000);
        // Expect loading spinner to be hidden
        await expect(loadingPage.spinner).toBeHidden(); 
    
    });

});