import { test, expect } from '@playwright/test';
import { AccordionPage } from './pom/accordion';

test.describe('Accordion Tests', () => {
    let accordionPage: AccordionPage;

test.beforeEach(async ({ page }) => {
    accordionPage = new AccordionPage(page);
    await page.goto('/public/accordion');
    // Expect page title to be Accordion
    await expect(accordionPage.heading).toBeVisible();
    // Expect Challenge to be visible
    await expect(accordionPage.challenge).toBeVisible();
});

test('Accordion page elements visible', async ({ page }) => {
    
  // Expect Terms and Conditions accordion to be visible
  await expect(accordionPage.termsAccordion).toBeVisible();
  // Expect Single accordion to be visible
  await expect(accordionPage.singleAccordion1).toBeVisible();
  await expect(accordionPage.singleAccordion2).toBeVisible();
  await expect(accordionPage.singleAccordion3).toBeVisible();
  // Expect Multiple accordion to be visible
  await expect(page.getByRole('button', { name: 'Item 1' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Item 2' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Item 3' })).toBeVisible();
  // Expect Tabs to be visible
  await expect(page.getByRole('tab', { name: 'Tab 1' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Tab 2' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Tab 3' })).toBeVisible();
  // Expect Tab content to be visible
  await expect(page.getByRole('tabpanel')).toBeVisible();
  
  
});

test('Accordion page - expand terms and conditions', async ({ page }) => {
    // click on the Terms and Conditions accordion
    
    await accordionPage.termsAccordion.click();
    // Check if the accordion content is visible
    const accordionContent = accordionPage.termsContent;
    await expect(accordionContent).toBeVisible();
    // Check 1st T & C
    await expect(accordionContent.locator(page.getByRole('heading', { name: 'Acceptance of Terms' }))).toBeVisible();
    // Check last T & C
    await expect(accordionContent.locator(page.getByRole('heading', { name: 'Contact Us' }))).toBeVisible();
    // Check Terms and Conditions checkbox is visible
    await expect(accordionPage.termsCheckbox).toBeVisible();
    // Check Terms and Conditions checkbox is unchecked
    await expect(accordionPage.termsCheckbox).toBeChecked({ checked: false });
    
});

test('Accordion page - check terms and conditions', async ({ page }) => {
    // click on the Terms and Conditions accordion
    await accordionPage.termsAccordion.click();
    // Check checkbox is unchecked
    await expect(accordionPage.termsCheckbox).toBeChecked({ checked: false });
    // Check if the checkbox can be checked
    await accordionPage.termsCheckbox.click();
    // Check if the checkbox is checked
    await expect(accordionPage.termsCheckbox).toBeChecked({ checked: true });
    // Check if the result text is visible
    await expect(accordionPage.termsResult).toBeVisible();
    // Check if the result text is correct
    expect(await accordionPage.termsResult.innerText()).toBe('Terms and Conditions: true');
    
});


test('Accordion page - expand single accordion', async ({ page }) => {
    // click on the Single accordion
    await accordionPage.singleAccordion1.click();
    // Check if only one accordion is expanded
    await expect(accordionPage.singleAccordion1).toHaveAttribute('data-state', 'open');
    await expect(accordionPage.singleAccordion2).toHaveAttribute('data-state', 'closed');
    await expect(accordionPage.singleAccordion3).toHaveAttribute('data-state', 'closed');
    // Check if the content of the first accordion is visible
    await expect(page.getByText('Content 1', {exact: true})).toBeVisible();
    // Check if the content of the second accordion is not visible
    await expect(page.getByText('Content 2', {exact: true})).toBeHidden();
    // Check if the content of the third accordion is not visible
    await expect(page.getByText('Content 3', {exact: true})).toBeHidden();

    // Select 2nd Accordion
    await accordionPage.singleAccordion2.click();
    // Check if the 2nd accordion is expanded
    await expect(accordionPage.singleAccordion2).toHaveAttribute('data-state', 'open');
    await expect(accordionPage.singleAccordion1).toHaveAttribute('data-state', 'closed');
    await expect(accordionPage.singleAccordion3).toHaveAttribute('data-state', 'closed');
    // Check if the content of the second accordion is visible
    await expect(page.getByText('Content 2', {exact: true})).toBeVisible();
    // Check if the content of the first accordion is not visible
    await expect(page.getByText('Content 1', {exact: true})).toBeHidden();
    // Check if the content of the third accordion is not visible
    await expect(page.getByText('Content 3', {exact: true})).toBeHidden();
    // Select 3rd Accordion
    await accordionPage.singleAccordion3.click();
    // Check if the 3rd accordion is expanded
    await expect(accordionPage.singleAccordion3).toHaveAttribute('data-state', 'open');
    await expect(accordionPage.singleAccordion1).toHaveAttribute('data-state', 'closed');
    await expect(accordionPage.singleAccordion2).toHaveAttribute('data-state', 'closed');
    // Check if the content of the third accordion is visible
    await expect(page.getByText('Content 3', {exact: true})).toBeVisible();
    // Check if the content of the first accordion is not visible
    await expect(page.getByText('Content 1', {exact: true})).toBeHidden();
    // Check if the content of the second accordion is not visible
    await expect(page.getByText('Content 2', {exact: true})).toBeHidden();

});


test('Accordion page - expand multiple accordion', async ({ page }) => {
    // click on the Multiple accordion
    await accordionPage.multipleAccordion1.click();
    // Check if the first accordion is expanded
    await expect(accordionPage.multipleAccordion1).toHaveAttribute('data-state', 'open');
    // Check if the content of the first accordion is visible
    await expect(page.getByText('Content 1', {exact: true})).toBeVisible();
    
    // Select 2nd Accordion
    await accordionPage.multipleAccordion2.click();
    // Check if the 2nd accordion is expanded
    await expect(accordionPage.multipleAccordion2).toHaveAttribute('data-state', 'open');
    // Check if the content of the second accordion is visible
    await expect(page.getByText('Content 2', {exact: true})).toBeVisible();
    
    // Select 3rd Accordion
    await accordionPage.multipleAccordion3.click();
    // Check if the 3rd accordion is expanded
    await expect(accordionPage.multipleAccordion3).toHaveAttribute('data-state', 'open');
    // Check if the content of the third accordion is visible
    await expect(page.getByText('Content 3', {exact: true})).toBeVisible();
    // Check all accordions are expanded
    await expect(accordionPage.multipleAccordion1).toHaveAttribute('data-state', 'open');
    await expect(accordionPage.multipleAccordion2).toHaveAttribute('data-state', 'open');
    await expect(accordionPage.multipleAccordion3).toHaveAttribute('data-state', 'open');

});

test('Accordion page - check tabs', async ({ page }) => {
    // Check if the first tab is selected
    await expect(accordionPage.tab1).toHaveAttribute('aria-selected', 'true');
    // Check if the content of the first tab is visible
    await expect(page.getByText('Item 1 in tab 1')).toBeVisible();
    
    // Select 2nd Tab
    await accordionPage.tab2.click();
    // Check if the 2nd tab is selected
    await expect(accordionPage.tab2).toHaveAttribute('aria-selected', 'true');
    // Check if the content of the second tab is visible
    await expect(page.getByText('Item 1 in tab 2')).toBeVisible();
    
    // Select 3rd Tab
    await accordionPage.tab3.click();
    // Check if the 3rd tab is selected
    await expect(accordionPage.tab3).toHaveAttribute('aria-selected', 'true');
    // Check if the content of the third tab is visible
    await expect(page.getByText('Item 1 in tab 3')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Checkbox' })).toBeVisible();
});

});









