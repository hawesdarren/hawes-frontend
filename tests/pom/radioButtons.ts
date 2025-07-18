import { Page, Locator } from "@playwright/test";

export class RadioButtonsPage {
    readonly page: Page;
    readonly header: Locator;
    //readonly challenge: Locator;
    // Triple option group
    readonly tripleOptionSection: Locator;
    readonly tripleOptionRadioButton1: Locator;
    readonly tripleOptionRadioButton2: Locator;
    readonly tripleOptionRadioButton3: Locator;
    readonly tripleOptionResult: Locator
    // Default option
    readonly defaultOptionSection: Locator;
    readonly defaultOptionRadioButtonYes: Locator;
    readonly defaultOptionRadioButtonNo: Locator;
    readonly defaultOptionResult: Locator;
    // Double option
    readonly doubleGroup1Section: Locator
    readonly doubleGroup1RadioButton1: Locator
    readonly doubleGroup1RadioButton2: Locator
    readonly doubleGroup1RadioButton3: Locator
    readonly doubleGroup2Section: Locator
    readonly doubleGroup2RadioButtonYes: Locator
    readonly doubleGroup2RadioButtonNo: Locator
    readonly doubleGroupSubmitButton: Locator;
    readonly doubleGroupResult: Locator;

    constructor(page: Page) {
    
    this.page = page;
    this.header = page.getByRole('heading', { level: 1})
    // Triple option group
    this.tripleOptionSection = page.getByTestId('triple-option-radio-group');
    this.tripleOptionRadioButton1 = this.tripleOptionSection.locator('div').filter({ hasText: 'Option One' }).getByRole('radio');
    this.tripleOptionRadioButton2 = this.tripleOptionSection.locator('div').filter({ hasText: 'Option Two' }).getByRole('radio');
    this.tripleOptionRadioButton3 = this.tripleOptionSection.locator('div').filter({ hasText: 'Option Three' }).getByRole('radio');
    this.tripleOptionResult = this.tripleOptionSection.locator('#selectedOption');
    // Default option group
    this.defaultOptionSection = page.getByRole('radiogroup').filter({ has: page.getByRole('heading', { name: 'Default option' }) });
    this.defaultOptionRadioButtonYes = this.defaultOptionSection.locator('div').filter({ hasText: 'Yes' }).getByRole('radio');
    this.defaultOptionRadioButtonNo = this.defaultOptionSection.locator('div').filter({ hasText: 'No' }).getByRole('radio');
    this.defaultOptionResult = this.defaultOptionSection.locator('#selectedOptionTwo');
    // Double option groups
    this.doubleGroup1Section = page.getByTestId('double-option-radio-group-1');
    this.doubleGroup1RadioButton1 = this.doubleGroup1Section.locator('div').filter({ hasText: 'Option One' }).getByRole('radio');
    this.doubleGroup1RadioButton2 = this.doubleGroup1Section.locator('div').filter({ hasText: 'Option Two' }).getByRole('radio');
    this.doubleGroup1RadioButton3 = this.doubleGroup1Section.locator('div').filter({ hasText: 'Option Three' }).getByRole('radio');
    this.doubleGroup2Section = page.getByTestId('double-option-radio-group-2');
    this.doubleGroup2RadioButtonYes = this.doubleGroup2Section.locator('div').filter({ hasText: 'Yes' }).getByRole('radio');  
    this.doubleGroup2RadioButtonNo = this.doubleGroup2Section.locator('div').filter({ hasText: 'No' }).getByRole('radio');  
    this.doubleGroupSubmitButton = page.getByRole('button', { name: 'Submit' });
    this.doubleGroupResult = page.locator('#selectedOptionThree');
  
    }
}