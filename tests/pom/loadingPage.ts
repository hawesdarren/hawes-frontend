import { Page, Locator } from "@playwright/test";

export class LoadingPage {
    readonly page: Page;
    readonly spinner: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.spinner = page.getByTestId('loading-spinner');

      
    }
}