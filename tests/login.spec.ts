import { test, expect} from '@playwright/test';
import { LoginPage } from './pom/login';

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('scenarios/login');
        // Expect header to be visible
        await expect(loginPage.header).toBeVisible();
    });

    test('Login page elements are visible', async ({ page }) => {
        // Expect email input to be visible
        await expect(loginPage.emailInput).toBeVisible();
        // Expect password input to be visible
        await expect(loginPage.passwordInput).toBeVisible();
        // Expect login button to be visible
        await expect(loginPage.loginButton).toBeVisible();
        // Expect cancel button to be visible
        await expect(loginPage.cancelButton).toBeVisible();
        // Expect register link to be visible
        await expect(loginPage.registerLink).toBeVisible();
        // Expect forgot password link to be visible
        await expect(loginPage.forgotPasswordLink).toBeVisible();   
    });

    test('Login with empty fields shows validation errors', async ({ page }) => {
        // Click login button without entering credentials
        await loginPage.loginButton.click();
        // Expect validation errors to be visible
        await expect(loginPage.emailError).toBeVisible();
        await expect(loginPage.emailError).toHaveText('Email is required.');
        await expect(loginPage.passwordError).toBeVisible();
        await expect(loginPage.passwordError).toHaveText('Password is required.');
    });

    test('Email format validation works', async ({ page }) => {
        // Enter invalid email format
        await loginPage.emailInput.fill('invalid-email');
        // Move focus to password field to trigger validation
        await loginPage.passwordInput.click();
        // Expect email format validation error to be visible
        await expect(loginPage.emailError).toBeVisible();
        await expect(loginPage.emailError).toHaveText('Please enter a valid email address.');
    });

    test('Mocked invalid login shows error message', async ({ page }) => {
        // Setup payload for mocked response
        const invalidLoginPayload = {
            tempPassword: 'false',
            token: null,
            refreshToken: null,
            expiry: null,
            tfaEnabled: 'false',
            success: 'false',
            authenticated: 'false',
            error: 'INVALID'
        };
        // Setup Mocked response for invalid login
        await page.route('/api/authentication/login', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(invalidLoginPayload),
            });
        });

        // Load the login page
        await page.goto('scenarios/login');

        // Enter invalid credentials
        await loginPage.emailInput.fill('valid@example.com');
        await loginPage.passwordInput.fill('wrongpassword');
        await loginPage.loginButton.click();

        // Expect error message to be visible
        await expect(loginPage.loginError).toBeVisible();
        await expect(loginPage.loginError).toHaveText('Invalid email or password. Please try again.');
    });

    test('Mocked invalid email format shows error message', async ({ page }) => {
        // Setup payload for mocked response
        const invalidLoginPayload = {
            tempPassword: 'false',
            token: null,
            refreshToken: null,
            expiry: null,
            tfaEnabled: 'false',
            success: 'false',
            authenticated: 'false',
            error: 'INVALID_EMAIL'
        };
        // Setup Mocked response for invalid login
        await page.route('/api/authentication/login', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(invalidLoginPayload),
            });
        });

        // Load the login page
        await page.goto('scenarios/login');

        // Enter invalid credentials
        await loginPage.emailInput.fill('invalid@example.com');
        await loginPage.passwordInput.fill('password');
        await loginPage.loginButton.click();

        // Expect error message to be visible
        await expect(loginPage.loginError).toBeVisible();
        await expect(loginPage.loginError).toHaveText('Please enter a valid email address.');
    });


    test('Mocked password temporary block shows error message', async ({ page }) => {
        // Setup payload for mocked response
        const invalidLoginPayload = {
            tempPassword: 'false',
            token: null,
            refreshToken: null,
            expiry: null,
            tfaEnabled: 'false',
            success: 'false',
            authenticated: 'false',
            error: 'PASSWORD_TEMP_BLOCK'
        };
        // Setup Mocked response for invalid login
        await page.route('/api/authentication/login', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(invalidLoginPayload),
            });
        });

        // Load the login page
        await page.goto('scenarios/login');

        // Enter invalid credentials
        await loginPage.emailInput.fill('invalid@example.com');
        await loginPage.passwordInput.fill('password');
        await loginPage.loginButton.click();

        // Expect error message to be visible
        await expect(loginPage.loginError).toBeVisible();
        await expect(loginPage.loginError).toHaveText('Your password is temporarily blocked. Please try again latter.');
    });

        test('Mocked temporary password expired shows error message', async ({ page }) => {
        // Setup payload for mocked response
        const invalidLoginPayload = {
            tempPassword: 'true',
            token: null,
            refreshToken: null,
            expiry: null,
            tfaEnabled: 'false',
            success: 'false',
            authenticated: 'false',
            error: 'TEMP_PASSWORD_EXPIRED'
        };
        // Setup Mocked response for invalid login
        await page.route('/api/authentication/login', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(invalidLoginPayload),
            });
        });

        // Load the login page
        await page.goto('scenarios/login');

        // Enter invalid credentials
        await loginPage.emailInput.fill('invalid@example.com');
        await loginPage.passwordInput.fill('password');
        await loginPage.loginButton.click();

        // Expect error message to be visible
        await expect(loginPage.loginError).toBeVisible();
        await expect(loginPage.loginError).toHaveText('Your temporarly password has expired. Use the forgot password link to reset it.');
    });


        test('Mocked temporary password and tfa disabled redirected to reset password page', async ({ page }) => {
        // Setup payload for mocked response
        const loginPayload = {
            tempPassword: 'true',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9hdXRoZW50aWNhdGlvbiI6IlRydWUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzb21lb25lQHNvbWV3aGVyZS5jby5ueiIsImV4cCI6MTc2NTc1MjQyNCwiaXNzIjoidGVzdC5oYXdlcy5jby5ueiIsImF1ZCI6InRlc3QuaGF3ZXMuY28ubnoifQ.90RaQNuXvRdMv-puRAqSLMEybT2toIVi2EXwaf1XceQ',
            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9hdXRoZW50aWNhdGlvbiI6IlRydWUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzb21lb25lQHNvbWV3aGVyZS5jby5ueiIsImV4cCI6MTc2NTc4NzgyNCwiaXNzIjoidGVzdC5oYXdlcy5jby5ueiIsImF1ZCI6InRlc3QuaGF3ZXMuY28ubnoifQ.dzaTukrXDXfnX7saNQ3j-yWH4_J_D1kfVN6FV2SPzXo',
            expiry: 1665752424,
            tfaEnabled: 'false',
            success: 'true',
            authenticated: 'false',
  
        };
        // Setup Mocked response for invalid login
        await page.route('/api/authentication/login', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(loginPayload),
            });
        });

        // Load the login page
        await page.goto('scenarios/login');

        // Enter invalid credentials
        await loginPage.emailInput.fill('valid@example.com');
        await loginPage.passwordInput.fill('password');
        await loginPage.loginButton.click();

        // Expect user redirected to reset password page
        await expect(page).toHaveURL(/.*scenarios\/password-reset.*/);
    });

    });