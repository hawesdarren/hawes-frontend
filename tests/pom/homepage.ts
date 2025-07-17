import { Page, Locator } from "@playwright/test";

export class Homepage {
    readonly page: Page;
    readonly logo: Locator;
    readonly hamburger: Locator;
    readonly darkModeToggle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByTestId('logo');
        this.hamburger = page.getByTestId('hamburgerMenu');
        this.darkModeToggle = page.getByTestId('darkModeToggle'); 
      
    }
}