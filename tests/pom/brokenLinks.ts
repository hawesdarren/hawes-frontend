import { Page, Locator } from "@playwright/test";

export class BrokenLinksPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly challenge: Locator;
    readonly imagesHeading: Locator;
    readonly footer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Broken Links', level: 1 });  
        this.challenge = page.getByTestId('challenge');
        this.imagesHeading = page.getByRole('heading', { name: 'Images'})
        this.footer = page.locator('footer')
    }
}