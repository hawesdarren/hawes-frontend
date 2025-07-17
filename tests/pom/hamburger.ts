import { Page, Locator } from "@playwright/test";

export class HamburgerMenu {
    readonly page: Page;
    readonly hamburger: Locator;
    readonly hamburgerMenuItems: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.hamburger = page.getByTestId('hamburgerMenu');
        this.hamburgerMenuItems = page.locator('#hamburgerMenuItems');
      
    }
}