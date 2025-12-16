import { Page, Locator } from "@playwright/test";

export class TfaVerifyPage {
    readonly page: Page;
    readonly header: Locator;
    // OTP input
    readonly otpInput: Locator;
    // Error message
    readonly errorMessage: Locator;
    // Login again link
    readonly loginAgainLink: Locator;
    // Cancel button
    readonly cancelButton: Locator;

    constructor(page: Page) {
    
    this.page = page;
    this.header = page.getByRole('heading', { level: 1})
    // OTP input
    this.otpInput = page.getByTestId('otp-input');
    // Error message
    this.errorMessage = page.getByTestId('tfa-verify-otp-error-message');
    // Login again link
    this.loginAgainLink = page.getByTestId('login-again-link');
    // Cancel button
    this.cancelButton = page.getByTestId('cancel-button');
    
  
    }
}