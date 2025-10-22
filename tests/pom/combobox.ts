import { Page, Locator } from "@playwright/test";

export class ComboboxPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly challenge: Locator;
    readonly staticComboboxSection: Locator;
    readonly staticComboboxHeader: Locator;
    readonly staticCombobox: Locator;
    readonly staticComboboxSelected: Locator;
    readonly dynamicComboboxSection: Locator;
    readonly dynamicComboboxHeader: Locator;
    readonly dynamicCombobox: Locator;
    readonly dynamicComboboxSelected: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Combobox', level: 1 });  
        this.challenge = page.getByTestId('challenge');
        this.staticComboboxSection = page.getByTestId('static-combobox-section');
        this.staticComboboxHeader = this.staticComboboxSection.getByRole('heading', { name: 'Static combobox', level: 4 });
        this.staticCombobox = this.staticComboboxSection.getByRole('combobox').filter({ hasText: 'Select a fruit' });
        this.staticComboboxSelected = page.getByTestId('static-combobox-selected');
        this.dynamicComboboxSection = page.getByTestId('dynamic-combobox-section');
        this.dynamicComboboxHeader = this.dynamicComboboxSection.getByRole('heading', { name: 'Dynamic combobox', level: 4 });
        this.dynamicCombobox = this.dynamicComboboxSection.getByRole('combobox').filter({ hasText: 'Select an account' });
        this.dynamicComboboxSelected = page.getByTestId('dynamic-combobox-selected');

    }
}