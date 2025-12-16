import { Page, Locator } from "@playwright/test";

export class TfaSetupPage {
    readonly page: Page;
    readonly header: Locator;
    // QR Image
    readonly qrImage: Locator;
    readonly qrImageError: Locator;
    readonly qrSkeleton: Locator;
    // QR Key copy button
    readonly copyQrKeyButton: Locator;
    // TFA OTP input
    readonly tfaSetupOtpInput: Locator;
    // Error message
    readonly errorMessage: Locator;
    // No TFA login button
    readonly noTfaLoginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.getByRole('heading', { name: 'Two factor setup', level: 1 });  
        // QR Image
        this.qrImage = page.getByTestId('tfa-setup-qr-image');
        this.qrImageError = page.getByTestId('qr-image-error');
        this.qrSkeleton = page.getByTestId('tfa-setup-qr-skeleton');
        // QR Key copy button
        this.copyQrKeyButton = page.getByTestId('copy-qr-key-button');
        // TFA OTP input
        this.tfaSetupOtpInput = page.getByTestId('tfa-setup-otp-input');
        // Error message
        this.errorMessage = page.getByTestId('error-message');
        // No TFA login button
        this.noTfaLoginButton = page.getByTestId('tfa-setup-no-tfa-login-button');
     

    }
}