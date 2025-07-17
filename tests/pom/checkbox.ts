import { Page, Locator } from "@playwright/test";

export class CheckboxPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly challenge: Locator;
    // Single checkbox
    readonly singleCheckbox: Locator;
    readonly singleCheckboxResult: Locator;
    // Default checkbox
    readonly defaultCheckbox: Locator;
    readonly defaultCheckboxResult: Locator;
    // Disabled checkbox
    readonly enabledCheckbox: Locator;
    readonly disabledCheckbox: Locator;
    // Multiple checkboxes
    readonly multipleCheckboxesSection: Locator;  
    readonly multipleCheckboxesCheckbox1: Locator;
    readonly multipleCheckboxesCheckbox2: Locator;
    readonly multipleCheckboxesCheckbox3: Locator;
    readonly multipleCheckboxesSubmitButton: Locator;  
    readonly multipleCheckboxesResult: Locator;
    // Any two checkboxes
    readonly anyTwoCheckboxesSection: Locator;
    readonly anyTwoCheckboxesCheckbox1: Locator;
    readonly anyTwoCheckboxesCheckbox2: Locator;
    readonly anyTwoCheckboxesCheckbox3: Locator;
    readonly anyTwoCheckboxesCheckbox4: Locator;
    readonly anyTwoCheckboxesCheckbox5: Locator;
    readonly anyTwoCheckboxesSubmitButton: Locator;
    readonly anyTwoCheckboxesResult: Locator;
    readonly anyTwoCheckboxesWarningMessage: Locator;
    // Select All checkboxes
    readonly selectAllCheckboxesSection: Locator;
    readonly selectAllCheckboxesCheckbox1: Locator;
    readonly selectAllCheckboxesCheckbox2: Locator;
    readonly selectAllCheckboxesCheckbox3: Locator;
    readonly selectAllCheckboxesCheckbox4: Locator;
    readonly selectAllCheckboxesCheckbox5: Locator;
    readonly selectAllCheckboxesCheckboxAll: Locator;
    readonly selectAllCheckboxesSubmitButton: Locator;
    readonly selectAllCheckboxesMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Checkbox', level: 1 });  
        this.challenge = page.getByTestId('challenge');
        // Single checkbox
        this.singleCheckbox = page.getByLabel('Accept terms and conditions');
        this.singleCheckboxResult = page.locator('#tAndCResult');
        // Default checkbox
        this.defaultCheckbox = page.locator('#optIn');
        this.defaultCheckboxResult = page.locator('#optInResult');
        // Disabled checkbox
        this.enabledCheckbox = page.getByLabel('Enabled');
        this.disabledCheckbox = page.getByLabel('Disabled');
        // Multiple checkboxes
        this.multipleCheckboxesSection = page.getByTestId('multiCheckboxes');
        this.multipleCheckboxesCheckbox1 = this.multipleCheckboxesSection.getByRole('checkbox', { name: 'Option 1' });
        this.multipleCheckboxesCheckbox2 = this.multipleCheckboxesSection.getByRole('checkbox', { name: 'Option 2' });
        this.multipleCheckboxesCheckbox3 = this.multipleCheckboxesSection.getByRole('checkbox', { name: 'Option 3' });
        this.multipleCheckboxesSubmitButton = this.multipleCheckboxesSection.getByRole('button', { name: 'Submit' });
        this.multipleCheckboxesResult = this.multipleCheckboxesSection.locator('#multipleOptResult');
        // Any two checkboxes
        this.anyTwoCheckboxesSection = page.getByTestId('anyTwoCheckboxes');
        this.anyTwoCheckboxesCheckbox1 = this.anyTwoCheckboxesSection.getByRole('checkbox', { name: 'Option 1' });
        this.anyTwoCheckboxesCheckbox2 = this.anyTwoCheckboxesSection.getByRole('checkbox', { name: 'Option 2' });
        this.anyTwoCheckboxesCheckbox3 = this.anyTwoCheckboxesSection.getByRole('checkbox', { name: 'Option 3' });
        this.anyTwoCheckboxesCheckbox4 = this.anyTwoCheckboxesSection.getByRole('checkbox', { name: 'Option 4' });
        this.anyTwoCheckboxesCheckbox5 = this.anyTwoCheckboxesSection.getByRole('checkbox', { name: 'Option 5' });
        this.anyTwoCheckboxesSubmitButton = this.anyTwoCheckboxesSection.getByRole('button', { name: 'Submit' });
        this.anyTwoCheckboxesResult = this.anyTwoCheckboxesSection.locator('#anyTwoResult');
        this.anyTwoCheckboxesWarningMessage = this.anyTwoCheckboxesSection.locator('#anyTwoErrorMessage');
        // Select All checkboxes
        this.selectAllCheckboxesSection = page.getByTestId('allCheckboxes');
        this.selectAllCheckboxesCheckbox1 = this.selectAllCheckboxesSection.getByRole('checkbox', { name: 'Option 1' });
        this.selectAllCheckboxesCheckbox2 = this.selectAllCheckboxesSection.getByRole('checkbox', { name: 'Option 2' });
        this.selectAllCheckboxesCheckbox3 = this.selectAllCheckboxesSection.getByRole('checkbox', { name: 'Option 3' });
        this.selectAllCheckboxesCheckbox4 = this.selectAllCheckboxesSection.getByRole('checkbox', { name: 'Option 4' });
        this.selectAllCheckboxesCheckbox5 = this.selectAllCheckboxesSection.getByRole('checkbox', { name: 'Option 5' });
        this.selectAllCheckboxesCheckboxAll = this.selectAllCheckboxesSection.getByRole('checkbox', { name: 'All' });
        this.selectAllCheckboxesSubmitButton = this.selectAllCheckboxesSection.getByRole('button', { name: 'Submit' });
        this.selectAllCheckboxesMessage = this.selectAllCheckboxesSection.locator('#onCheckAllMessage');
    }
}