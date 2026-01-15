import { test, expect} from '@playwright/test';
import { TfaSetupPage } from './pom/tfaSetup';

test.describe('TFA Setup Page Tests', () => {
    let tfaSetupPage: TfaSetupPage;


    test('Mocked - TFA page elements display correctly', async ({ page }) => {
        tfaSetupPage = new TfaSetupPage(page);
        // Mock payload response for TFA setup
        const payload = {
            keyUri: 'otpauth://totp/test.hawes.co.nz:test31%40hawes.co.nz?secret=BBNNEL3QJWUPLDQQ5HALFB25CL376LCT&issuer=test.hawes.co.nz&algorithm=SHA1&digits=6&period=30',
            success: true,
            authenticated: false
        };
        
        // Mock key uri response
        await page.route('**/api/authentication/tfa/setup', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload),
            });
        });
        // Navigate to TFA setup page
        await page.goto('/scenarios/two-factor-setup');
        // Verify page elements
        await expect(tfaSetupPage.header).toBeVisible();
        await expect(tfaSetupPage.qrSkeleton).toBeHidden();
        await expect(tfaSetupPage.qrImage).toBeVisible();
        await expect(tfaSetupPage.qrImageError).toBeHidden();
        await expect(tfaSetupPage.copyQrKeyButton).toBeVisible();
        await expect(tfaSetupPage.tfaSetupOtpInput).toBeVisible();
        await expect(tfaSetupPage.errorMessage).toBeHidden();
        await expect(tfaSetupPage.noTfaLoginButton).toBeVisible();
    });

    test('QR Skelton display correctly', async ({ page }) => {
        tfaSetupPage = new TfaSetupPage(page);
        
        // Navigate to TFA setup page
        await page.goto('/scenarios/two-factor-setup');
        // Verify page elements
        await expect(tfaSetupPage.header).toBeVisible();
        await expect(tfaSetupPage.qrSkeleton).toBeVisible();
        await expect(tfaSetupPage.qrImage).toBeHidden();
        await expect(tfaSetupPage.qrImageError).toBeVisible();
        await expect(tfaSetupPage.copyQrKeyButton).toBeVisible();
        await expect(tfaSetupPage.tfaSetupOtpInput).toBeVisible();
        await expect(tfaSetupPage.errorMessage).toBeHidden();
        await expect(tfaSetupPage.noTfaLoginButton).toBeVisible();
    });

    test('Mocked - Successfully submit TFA code', async ({ page }) => {
        tfaSetupPage = new TfaSetupPage(page);
        // Mock payload response for TFA setup
        const payload = {
            keyUri: 'otpauth://totp/test.hawes.co.nz:test31%40hawes.co.nz?secret=BBNNEL3QJWUPLDQQ5HALFB25CL376LCT&issuer=test.hawes.co.nz&algorithm=SHA1&digits=6&period=30',
            success: true,
            authenticated: false
        };
        
        // Mock key uri response
        await page.route('**/api/authentication/tfa/setup', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload),
            });
        });
        // Navigate to TFA setup page
        await page.goto('/scenarios/two-factor-setup');
        
        // Mock TFA verify response
        const verifyPayload = {
            success: true,
            authenticated: false
        };

        await page.route('**/api/authentication/tfa/enable', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(verifyPayload),
            });
        });

        // Enter TFA code
        await tfaSetupPage.tfaSetupOtpInput.fill('123456');

        // Verify no error message displayed
        await expect(tfaSetupPage.errorMessage).toBeHidden();
        // Verify redirected to secure landing page
        await expect(page).toHaveURL('/scenarios/secure-landing');
    });

    test('Mocked - Invalid TFA code', async ({ page }) => {
        tfaSetupPage = new TfaSetupPage(page);
        // Mock payload response for TFA setup
        const payload = {
            keyUri: 'otpauth://totp/test.hawes.co.nz:test31%40hawes.co.nz?secret=BBNNEL3QJWUPLDQQ5HALFB25CL376LCT&issuer=test.hawes.co.nz&algorithm=SHA1&digits=6&period=30',
            success: true,
            authenticated: false
        };
        
        // Mock key uri response
        await page.route('**/api/authentication/tfa/setup', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload),
            });
        });
        // Navigate to TFA setup page
        await page.goto('/scenarios/two-factor-setup');
        
        // Mock TFA verify response
        const verifyPayload = {
            success: false,
            authenticated: false,
            error: 'TFA_INVALID_CODE'
        };

        await page.route('**/api/authentication/tfa/enable', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(verifyPayload),
            });
        });

        // Enter TFA code
        await tfaSetupPage.tfaSetupOtpInput.fill('123456');

        // Verify  error message displayed
        await expect(tfaSetupPage.errorMessage).toBeVisible();
        await expect(tfaSetupPage.errorMessage).toHaveText('Invalid OTP code. Please try again.');
        // Verify still on TFA setup page
        await expect(page).toHaveURL('/scenarios/two-factor-setup');
    });

    test('Mocked - 401 - Token timeout', async ({ page }) => {
        tfaSetupPage = new TfaSetupPage(page);
        // Mock payload response for TFA setup
        const payload = {
            keyUri: 'otpauth://totp/test.hawes.co.nz:test31%40hawes.co.nz?secret=BBNNEL3QJWUPLDQQ5HALFB25CL376LCT&issuer=test.hawes.co.nz&algorithm=SHA1&digits=6&period=30',
            success: true,
            authenticated: false
        };
        
        // Mock key uri response
        await page.route('**/api/authentication/tfa/setup', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload),
            });
        });
        // Navigate to TFA setup page
        await page.goto('/scenarios/two-factor-setup');
        
        // Mock TFA verify response
        await page.route('**/api/authentication/tfa/enable', route => {
            route.fulfill({
                status: 401,
                contentType: 'application/json',
                
            });
        });

        // Enter TFA code
        await tfaSetupPage.tfaSetupOtpInput.fill('123456');

        // Verify  error message displayed
        await expect(tfaSetupPage.errorMessage).toBeVisible();
        await expect(tfaSetupPage.errorMessage).toHaveText('Your session has expired., Please login again and setup TFA.');
        // Verify still on TFA setup page
        await expect(page).toHaveURL('/scenarios/two-factor-setup');
    });

    test('Mocked - 500 - Error', async ({ page }) => {
        tfaSetupPage = new TfaSetupPage(page);
        // Mock payload response for TFA setup
        const payload = {
            keyUri: 'otpauth://totp/test.hawes.co.nz:test31%40hawes.co.nz?secret=BBNNEL3QJWUPLDQQ5HALFB25CL376LCT&issuer=test.hawes.co.nz&algorithm=SHA1&digits=6&period=30',
            success: true,
            authenticated: false
        };
        
        // Mock key uri response
        await page.route('**/api/authentication/tfa/setup', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload),
            });
        });
        // Navigate to TFA setup page
        await page.goto('/scenarios/two-factor-setup');
        
        // Mock TFA verify response
        await page.route('**/api/authentication/tfa/enable', route => {
            route.fulfill({
                status: 500,
                contentType: 'application/json',
                
            });
        });

        // Enter TFA code
        await tfaSetupPage.tfaSetupOtpInput.fill('123456');

        // Verify  error message displayed
        await expect(tfaSetupPage.errorMessage).toBeVisible();
        await expect(tfaSetupPage.errorMessage).toHaveText('Unexpected error. Please try again.');
        // Verify still on TFA setup page
        await expect(page).toHaveURL('/scenarios/two-factor-setup');
    });

});