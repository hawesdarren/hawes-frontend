import { Page, Locator } from "@playwright/test";

export class TablesPage {
    readonly page: Page;
    readonly header: Locator;
    readonly challenge: Locator;
    // Payments table
    readonly paymentsTable: Locator;
    // DoB table
    readonly dobTable: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly dob: Locator
    readonly dobBody: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.getByRole('heading', { level: 1 })
        this.challenge = page.getByTestId('challenge');
        // Payments table
        this.paymentsTable = page.getByTestId('paymentsTable')
        // DoB table
        this.dobTable = page.getByTestId('dobTable')
        this.firstName = this.dobTable.getByRole('button', {name: 'First name'});
        this.lastName = this.dobTable.getByRole('button', {name: 'Last name'});
        this.dob = this.dobTable.getByRole('button', {name: 'Date of birth'});
        this.dobBody = this.dobTable.locator('tbody')

     
    }
}