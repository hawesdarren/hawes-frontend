import { Page, Locator } from "@playwright/test";

export class ForgottenPasswordPage {
    readonly page: Page;
    readonly header: Locator;
    //Email field
    readonly emailInput: Locator
    readonly emailError: Locator
    // Submit button
    readonly submitButton: Locator;
    // Back to login button
    readonly backToLoginButton: Locator;
    // Form error
    readonly formError: Locator;
    // Success message
    readonly successMessage: Locator;
 

    constructor(page: Page) {
    
    this.page = page;
    this.header = page.getByRole('heading', { level: 1})
    // Email field
    this.emailInput = page.getByTestId('email-input');
    this.emailError = page.getByTestId('email-error');
    // Submit button
    this.submitButton = page.getByTestId('submit-button');
    // Back to login button
    this.backToLoginButton = page.getByTestId('back-to-login-button');
    // Form error
    this.formError = page.getByTestId('forgot-password-form-error');
    // Success message
    this.successMessage = page.getByTestId('forgot-password-success-message');
 
    
  
    }
}