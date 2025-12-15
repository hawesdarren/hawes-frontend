import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly header: Locator;
    //Email field
    readonly emailInput: Locator
    readonly emailError: Locator
    // Password field
    readonly passwordInput: Locator
    readonly passwordError: Locator
    // Form error
    readonly loginError: Locator
    // Login button
    readonly loginButton: Locator;
    // Cancel button
    readonly cancelButton: Locator;
    // Register link
    readonly registerLink: Locator;
    // Forgot password link
    readonly forgotPasswordLink: Locator;

    constructor(page: Page) {
    
    this.page = page;
    this.header = page.getByRole('heading', { level: 1})
    // Email field
    this.emailInput = page.getByLabel('Email');
    this.emailError = page.getByTestId('email-error');
    // Password field
    this.passwordInput = page.getByLabel('Password');
    this.passwordError = page.getByTestId('password-error');
    // Form error
    this.loginError = page.getByTestId('login-error');
    // Login button
    this.loginButton = page.getByRole('button', { name: 'Login' });
    // Cancel button
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    // Register link
    this.registerLink = page.getByRole('button', { name: "Don't have an account? Register" });
    // Forgot password link
    this.forgotPasswordLink = page.getByRole('button', { name: 'Forgot your password? Reset it' });
    
  
    }
}