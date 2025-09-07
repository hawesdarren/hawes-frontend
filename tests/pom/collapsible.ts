import { Page, Locator } from "@playwright/test";

export class CollapsiblePage {
    readonly page: Page;
    readonly heading: Locator;
    readonly challenge: Locator;
    readonly readMore: Locator;
    readonly collapsibleContent: Locator
    readonly footer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Collapsible', level: 1 });  
        this.challenge = page.getByTestId('challenge');
        this.readMore = page.getByRole('button', { name: 'Read more...' });
        this.collapsibleContent = page.getByText('Lorem ipsum dolor sit amet', { exact: false });
        this.footer = page.locator('footer')
    }
}