import { test, expect} from '@playwright/test';
import { TfaVerifyPage } from './pom/tfaVerify';

test.describe('TFA Verify Page Tests', () => {
    let tfaVerifyPage: TfaVerifyPage;


    test('TFA Verify page elements display correctly', async ({ page }) => {
        tfaVerifyPage = new TfaVerifyPage(page);
        // Navigate to TFA verify page
        await page.goto('/scenarios/tfa-verify');
        // Verify page elements
        await expect(tfaVerifyPage.header).toBeVisible();
        await expect(tfaVerifyPage.otpInput).toBeVisible();
        await expect(tfaVerifyPage.errorMessage).toBeHidden();
        await expect(tfaVerifyPage.loginAgainLink).toBeHidden();
        await expect(tfaVerifyPage.cancelButton).toBeVisible();
    });

    test('Mocked - Invalid OTP displays error message', async ({ page }) => {
        tfaVerifyPage = new TfaVerifyPage(page);
        // Mock payload response for TFA verify
        const payload = {
            token: '',
            refreshToken: '',
            success: false,
            authenticated: false,
            error: 'TFA_CODE_INVALID'
        };
        
        // Mock TFA verify response
        await page.route('**/api/authentication/tfa/validate', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload),
            });
        });
        // Navigate to TFA verify page
        await page.goto('/scenarios/tfa-verify');
        // Enter invalid OTP
        await tfaVerifyPage.otpInput.fill('123456');
        // Wait for verification to complete
        await page.waitForTimeout(1000); // Adjust timeout as needed
        // Verify error message is displayed
        await expect(tfaVerifyPage.errorMessage).toBeVisible();
        await expect(tfaVerifyPage.errorMessage).toHaveText('Invalid code. Please try again.');
    });

    test('Mocked - 401 Token timeout displays session expired message', async ({ page }) => {
        tfaVerifyPage = new TfaVerifyPage(page);
        // Mock TFA verify response
        await page.route('**/api/authentication/tfa/validate', route => {
            route.fulfill({
                status: 401,
                contentType: 'application/json',
                
            });
        });
        // Navigate to TFA verify page
        await page.goto('/scenarios/tfa-verify');
        // Enter OTP
        await tfaVerifyPage.otpInput.fill('123456');
        // Wait for verification to complete
        await page.waitForTimeout(1000); // Adjust timeout as needed
        // Verify session expired message is displayed
        await expect(tfaVerifyPage.errorMessage).toBeVisible();
        await expect(tfaVerifyPage.errorMessage).toHaveText('Your session has expired.Please log in again.');
    });

    test('Mocked - Valid OTP redirects to secure landing page', async ({ page }) => {
        tfaVerifyPage = new TfaVerifyPage(page);
        // Mock payload response for TFA verify
        const payload = {
            token: 'valid-token',
            refreshToken: 'valid-refresh-token',
            success: true,
            authenticated: true
        };
        
        // Mock TFA verify response
        await page.route('**/api/authentication/tfa/validate', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload),
            });
        });
        // Navigate to TFA verify page
        await page.goto('/scenarios/tfa-verify');
        // Enter valid OTP
        await tfaVerifyPage.otpInput.fill('654321');
        //Mock secure landing page response
        // todo mock token and refresh token storage
        // Verify redirection to secure landing page
        await expect(page).toHaveURL('/scenarios/secure-landing');
    });

    test('Mocked - Valid OTP, Temp password redirects to password reset page', async ({ page }) => {
        tfaVerifyPage = new TfaVerifyPage(page);
        // Mock payload response for TFA verify
        const payload = {
            token: 'valid-token',
            refreshToken: 'valid-refresh-token',
            success: true,
            authenticated: true
        };
        
        // Mock TFA verify response
        await page.route('**/api/authentication/tfa/validate', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload),
            });
        });
        // Navigate to TFA verify page
        await page.goto('/scenarios/tfa-verify?tempPassword=true');
        // Enter valid OTP
        await tfaVerifyPage.otpInput.fill('654321');
        // Verify redirection to password reset page
        await expect(page).toHaveURL('/scenarios/password-reset');
    });
});