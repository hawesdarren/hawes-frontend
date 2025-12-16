import { Page, Locator } from "@playwright/test";

export class RegisterPage {
    readonly page: Page;
    readonly heading: Locator;
    // Email
    readonly emailInput: Locator;
    readonly emailError: Locator;
    // Password
    readonly passwordInput: Locator;
    readonly passwordError: Locator;
    // Confirm Password
    readonly confirmPasswordInput: Locator;
    readonly confirmPasswordError: Locator;
    // Buttons
    readonly registerButton: Locator;
    readonly cancelButton: Locator;
    readonly loginLink: Locator;
    // Registration error
    readonly registrationError: Locator;    

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Register', level: 1 });  
        // Email
        this.emailInput = page.getByTestId('email');
        this.emailError = page.getByTestId('email-error');
        // Password
        this.passwordInput = page.getByTestId('password');
        this.passwordError = page.getByTestId('password-error');
        // Confirm Password
        this.confirmPasswordInput = page.getByTestId('confirmPassword');
        this.confirmPasswordError = page.getByTestId('confirm-password-error');
        // Buttons
        this.registerButton = page.getByTestId('register-button');
        this.cancelButton = page.getByTestId('cancel-button');
        this.loginLink = page.getByTestId('login-link');
        // Registration error
        this.registrationError = page.getByTestId('registration-error');
        

    }
}