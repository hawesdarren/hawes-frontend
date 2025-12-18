import { test, expect} from '@playwright/test';
import { ForgottenPasswordPage } from './pom/forgottenPassword';

test.describe('Forgotton Password Page Tests', () => {
    let forgottenPasswordPage: ForgottenPasswordPage;

    test.beforeEach(async ({ page }) => {
        forgottenPasswordPage = new ForgottenPasswordPage(page);
        await page.goto('scenarios/forgot-password');
        // Expect header to be visible
        await expect(forgottenPasswordPage.header).toBeVisible();
    });

    test('All elements are present on the forgot password page', async () => {
        await expect(forgottenPasswordPage.emailInput).toBeVisible();
        await expect(forgottenPasswordPage.submitButton).toBeVisible();
        await expect(forgottenPasswordPage.backToLoginButton).toBeVisible();
        await expect(forgottenPasswordPage.formError).toBeHidden();
        await expect(forgottenPasswordPage.successMessage).toBeHidden();
    });

    test('Submitting empty email shows validation error', async () => {
        await forgottenPasswordPage.submitButton.click();
        await expect(forgottenPasswordPage.emailError).toBeVisible();
        await expect(forgottenPasswordPage.emailError).toHaveText('Please enter a valid email address.');
    });

    test('Mocked - Submit valid email shows success message', async () => {
        // Set up mock payload 
        let payload = {
            success: true,
            authenticated: false
            
        };

        // Intercept the API call and return mock payload
        await forgottenPasswordPage.page.route('**/api/authentication/forgotten/password', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload),
            });
        });
        
        await forgottenPasswordPage.emailInput.click();
        await forgottenPasswordPage.emailInput.fill('test@example.com');
        await forgottenPasswordPage.submitButton.click();
        await expect(forgottenPasswordPage.successMessage).toBeVisible();
        await expect(forgottenPasswordPage.successMessage).toHaveText('If an account with that email exists, a temporary password has been sent.');
    });

    test('Mocked - Submit email not found shows error message', async () => {
        // Set up mock payload 
        let payload = {
            success: false,
            authenticated: false,
            error: "EMAIL_NOT_FOUND"
        };

        // Intercept the API call and return mock payload
        await forgottenPasswordPage.page.route('**/api/authentication/forgotten/password', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload),
            });
        });
        
        await forgottenPasswordPage.emailInput.click();
        await forgottenPasswordPage.emailInput.fill('emailnotfount@hawes.co.nz');
        await forgottenPasswordPage.submitButton.click();
        await expect(forgottenPasswordPage.formError).toBeVisible();
        await expect(forgottenPasswordPage.formError).toHaveText('Email address not found.');
    });

    test('Mocked - Submit email sending failure shows error message', async () => {
        // Set up mock payload 
        let payload = {
            success: false,
            authenticated: false,
            error: "EMAIL_SENDING_FAILED"
        };

        // Intercept the API call and return mock payload
        await forgottenPasswordPage.page.route('**/api/authentication/forgotten/password', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload),
            });
        });
        
        await forgottenPasswordPage.emailInput.click();
        await forgottenPasswordPage.emailInput.fill('validemail@hawes.co.nz');
        await forgottenPasswordPage.submitButton.click();
        await expect(forgottenPasswordPage.formError).toBeVisible();
        await expect(forgottenPasswordPage.formError).toHaveText('Failed to send reset email. Please try again later.');
    });

    test("Mocked - API server error shows error message", async () => {
        
        // Intercept the API call and return mock payload
        await forgottenPasswordPage.page.route('**/api/authentication/forgotten/password', route => {
            route.fulfill({
                status: 500,
                contentType: 'application/json',
                
            });
        });
        
        await forgottenPasswordPage.emailInput.click();
        await forgottenPasswordPage.emailInput.fill('validemail@hawes.co.nz');
        await forgottenPasswordPage.submitButton.click();
        await expect(forgottenPasswordPage.formError).toBeVisible();
        await expect(forgottenPasswordPage.formError).toHaveText('An error occurred. Please try again.');
    });

    test('Back to login button navigates to login page', async () => {
        await forgottenPasswordPage.backToLoginButton.click();
        await expect(forgottenPasswordPage.page).toHaveURL(/.*\/scenarios\/login/);
    });
});