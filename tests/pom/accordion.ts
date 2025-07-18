import { Page, Locator } from "@playwright/test";

export class AccordionPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly challenge: Locator;
    // Selectors for terms and conditions accordion
    readonly termsAccordion: Locator;
    readonly termsContent: Locator;
    readonly termsCheckbox: Locator;
    readonly termsResult: Locator;
    // Single accordion selectors
    readonly singleAccordion1: Locator;
    readonly singleAccordion2: Locator;
    readonly singleAccordion3: Locator;
    // Multiple accordion selectors
    readonly multipleAccordion1: Locator;
    readonly multipleAccordion2: Locator;
    readonly multipleAccordion3: Locator;
    // Tabs selectors
    readonly tab1: Locator;
    readonly tab2: Locator;
    readonly tab3: Locator;

    constructor(page: Page) {
        this.page = page; 
        this.heading = page.getByRole('heading', { name: 'Accordion', level: 1 });
        this.challenge = page.getByTestId('challenge');
        // Selectors for terms and conditions accordion
        this.termsAccordion = page.getByRole('button', { name: 'Terms and conditions' });
        this.termsContent = page.getByTestId('termsContent');
        this.termsCheckbox = page.getByRole('checkbox', { name: 'Accept terms and conditions' });
        this.termsResult = page.getByTestId('tAndCResult');
        // Single accordion selectors
        this.singleAccordion1 = page.getByRole('button', { name: '1st Accordion' });
        this.singleAccordion2 = page.getByRole('button', { name: '2nd Accordion' });
        this.singleAccordion3 = page.getByRole('button', { name: '3rd Accordion' });
        // Multiple accordion selectors
        this.multipleAccordion1 = page.getByRole('button', { name: 'Item 1' });
        this.multipleAccordion2 = page.getByRole('button', { name: 'Item 2' });
        this.multipleAccordion3 = page.getByRole('button', { name: 'Item 3' });
        // Tabs selectors
        this.tab1 = page.getByRole('tab', { name: 'Tab 1' });
        this.tab2 = page.getByRole('tab', { name: 'Tab 2' });
        this.tab3 = page.getByRole('tab', { name: 'Tab 3' });
    }
}