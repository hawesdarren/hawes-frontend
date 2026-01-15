import { test, expect} from '@playwright/test';
import { RegisterPage } from './pom/register';

test.describe('Register Page Tests', () => {
    let registerPage: RegisterPage;

    test('All elements are visible on the registration page', async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto('/scenarios/register');

        // Check that all elements are visible
        await expect(registerPage.heading).toBeVisible();
        await expect(registerPage.emailInput).toBeVisible();
        await expect(registerPage.passwordInput).toBeVisible();
        await expect(registerPage.confirmPasswordInput).toBeVisible();
        await expect(registerPage.registerButton).toBeVisible();
        await expect(registerPage.cancelButton).toBeVisible();
        await expect(registerPage.loginLink).toBeVisible();
    });

    test('Email incorrect format shows error message', async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto('/scenarios/register');

        // Enter invalid email
        await registerPage.emailInput.click();
        await registerPage.emailInput.fill('invalid-email-format');
        // Move focus to trigger validation
        await registerPage.passwordInput.click();

        // Check for email error message
        await expect(registerPage.emailError).toBeVisible();
        await expect(registerPage.emailError).toHaveText('Please enter a valid email address.');
    });

    test('Password too short shows error message', async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto('/scenarios/register');

        // Enter valid email
        await registerPage.emailInput.fill('valid@example.com');
        // Enter short password
        await registerPage.passwordInput.fill('short');
        // Move focus to trigger validation
        await registerPage.confirmPasswordInput.click();

        // Check for password error message
        await expect(registerPage.passwordError).toBeVisible();
        await expect(registerPage.passwordError).toHaveText('Password must be at least 7 characters, contain 1 upper case character and 1 number.');
    });

    test('Confirm password mismatch shows error message', async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto('/scenarios/register');

        // Enter valid email
        await registerPage.emailInput.fill('valid@example.com');
        // Enter valid password
        await registerPage.passwordInput.fill('ValidPass1');
        // Enter mismatching confirm password
        await registerPage.confirmPasswordInput.fill('DifferentPass1');
        // Move focus to trigger validation
        await registerPage.emailInput.click();

        // Check for confirm password error message
        await expect(registerPage.confirmPasswordError).toBeVisible();
        await expect(registerPage.confirmPasswordError).toHaveText('Passwords do not match.');
    });

    test('Mocked response - successful registration redirects to tfa setup page', async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto('/scenarios/register');

        // Fill in valid registration details
        await registerPage.emailInput.click();
        await registerPage.emailInput.fill('valid@example.com');
        await registerPage.passwordInput.click();
        await registerPage.passwordInput.fill('ValidPass1');
        await registerPage.confirmPasswordInput.click();
        await registerPage.confirmPasswordInput.fill('ValidPass1');

        // Payload for the mocked successful registration response
        const payload = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9hdXRoZW50aWNhdGlvbiI6IkZhbHNlIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidGVzdDI3QGhhd2VzLmNvLm56IiwiZXhwIjoxNzY1ODM2NTcxLCJpc3MiOiJ0ZXN0Lmhhd2VzLmNvLm56IiwiYXVkIjoidGVzdC5oYXdlcy5jby5ueiJ9.ZaLIB-P5E7Zd60V6hpVwmDsmqt61P-Baq6_IaAldXS0',
            success: true,
            authenticated: false
        }
        
        // Intercept the registration API call and mock a successful response
        await page.route('/api/authentication/register', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload)
            });
        });

        // Submit the registration form
        await registerPage.registerButton.click();

        // Verify redirection to TFA setup page
        await expect(page).toHaveURL('/scenarios/two-factor-setup');
    });

    test('Mocked response - Invalid email', async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto('/scenarios/register');

        // Fill in valid registration details
        await registerPage.emailInput.click();
        await registerPage.emailInput.fill('valid@example.com');
        await registerPage.passwordInput.click();
        await registerPage.passwordInput.fill('ValidPass1');
        await registerPage.confirmPasswordInput.click();
        await registerPage.confirmPasswordInput.fill('ValidPass1');

        // Payload for the mocked successful registration response
        const payload = {
            token: null,
            success: false,
            authenticated: false,
            error: 'INVALID_EMAIL'
        }
        
        // Intercept the registration API call and mock a successful response
        await page.route('/api/authentication/register', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload)
            });
        });

        // Submit the registration form
        await registerPage.registerButton.click();

        // Verify Error message is shown
        await expect(registerPage.emailError).toBeVisible();
        await expect(registerPage.emailError).toHaveText('Please enter a valid email address.');
    });

    test('Mocked response - Passwords don\'t match', async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto('/scenarios/register');

        // Fill in valid registration details
        await registerPage.emailInput.click();
        await registerPage.emailInput.fill('valid@example.com');
        await registerPage.passwordInput.click();
        await registerPage.passwordInput.fill('ValidPass1');
        await registerPage.confirmPasswordInput.click();
        await registerPage.confirmPasswordInput.fill('ValidPass1');

        // Payload for the mocked successful registration response
        const payload = {
            token: null,
            success: false,
            authenticated: false,
            error: 'PASSWORDS_DONT_MATCH'
        }
        
        // Intercept the registration API call and mock a successful response
        await page.route('/api/authentication/register', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload)
            });
        });

        // Submit the registration form
        await registerPage.registerButton.click();

        // Verify Error message is shown
        await expect(registerPage.confirmPasswordError).toBeVisible();
        await expect(registerPage.confirmPasswordError).toHaveText('Passwords do not match.');
    });

    test('Mocked response - Email already registered', async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto('/scenarios/register');

        // Fill in valid registration details
        await registerPage.emailInput.click();
        await registerPage.emailInput.fill('valid@example.com');
        await registerPage.passwordInput.click();
        await registerPage.passwordInput.fill('ValidPass1');
        await registerPage.confirmPasswordInput.click();
        await registerPage.confirmPasswordInput.fill('ValidPass1');

        // Payload for the mocked successful registration response
        const payload = {
            token: null,
            success: false,
            authenticated: false,
            error: 'EMAIL_ALREADY_REGISTERED'
        }
        
        // Intercept the registration API call and mock a successful response
        await page.route('/api/authentication/register', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload)
            });
        });

        // Submit the registration form
        await registerPage.registerButton.click();

        // Verify Error message is shown
        await expect(registerPage.emailError).toBeVisible();
        await expect(registerPage.emailError).toHaveText('This email address is already registered. Please try logging in or use a different email.');
    });

    test('Mocked response - Password complexity', async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto('/scenarios/register');

        // Fill in valid registration details
        await registerPage.emailInput.click();
        await registerPage.emailInput.fill('valid@example.com');
        await registerPage.passwordInput.click();
        await registerPage.passwordInput.fill('ValidPass1');
        await registerPage.confirmPasswordInput.click();
        await registerPage.confirmPasswordInput.fill('ValidPass1');

        // Payload for the mocked successful registration response
        const payload = {
            token: null,
            success: false,
            authenticated: false,
            error: 'PASSWORD_COMPLEXITY'
        }
        
        // Intercept the registration API call and mock a successful response
        await page.route('/api/authentication/register', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload)
            });
        });

        // Submit the registration form
        await registerPage.registerButton.click();

        // Verify Error message is shown
        await expect(registerPage.passwordError).toBeVisible();
        await expect(registerPage.passwordError).toHaveText('Password must be at least 7 characters, contain 1 upper case character and 1 number.');
    });

    test('Mocked response - Common password', async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto('/scenarios/register');

        // Fill in valid registration details
        await registerPage.emailInput.click();
        await registerPage.emailInput.fill('valid@example.com');
        await registerPage.passwordInput.click();
        await registerPage.passwordInput.fill('ValidPass1');
        await registerPage.confirmPasswordInput.click();
        await registerPage.confirmPasswordInput.fill('ValidPass1');

        // Payload for the mocked successful registration response
        const payload = {
            token: null,
            success: false,
            authenticated: false,
            error: 'COMMON_PASSWORD'
        }
        
        // Intercept the registration API call and mock a successful response
        await page.route('/api/authentication/register', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload)
            });
        });

        // Submit the registration form
        await registerPage.registerButton.click();

        // Verify Error message is shown
        await expect(registerPage.passwordError).toBeVisible();
        await expect(registerPage.passwordError).toHaveText('This password is too common and easy to guess. Please choose a more secure password.');
    });
});