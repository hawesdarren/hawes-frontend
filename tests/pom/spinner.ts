import { Page, Locator } from "@playwright/test";

export class Spinner {
    readonly page: Page;
    readonly saveButton: Locator;
    readonly saveButtonSpinner: Locator;
    readonly loadPageButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.saveButton = page.getByTestId('save-button');
        this.saveButtonSpinner = this.saveButton.locator('svg');
        this.loadPageButton = page.getByTestId('load-button');
      
    }
}