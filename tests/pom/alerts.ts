import { Page, Locator } from "@playwright/test";

export class AlertsPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly challenge: Locator;
    readonly alertButton: Locator;
    readonly alertBox: Locator;
    readonly alertTitle: Locator;
    readonly alertMessage: Locator;
    readonly alertCloseButton: Locator;
    readonly alertConfirmButton: Locator;
    readonly alertActionResult: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Alerts', level: 1 });  
        this.challenge = page.getByTestId('challenge');
        this.alertButton = page.getByRole('button', { name: 'Show Alert' });
        this.alertBox = page.getByRole('alertdialog')
        this.alertTitle = this.alertBox.getByRole('heading', { level: 2 }).first();
        this.alertMessage = this.alertBox.locator('p').first();
        this.alertCloseButton = this.alertBox.getByRole('button', { name: 'Cancel' });
        this.alertConfirmButton = this.alertBox.getByRole('button', { name: 'Continue' });
        this.alertActionResult = page.getByTestId('alert-action');

    }
}