import { test, expect } from '@playwright/test';
import { Checkbox } from '@radix-ui/react-checkbox';

test('Accordion page elements visible', async ({ page }) => {
  await page.goto('/public/accordion');
  // Expect page title to be Accordion
  await expect(page.getByRole('heading', { name: 'Accordion', level: 1 })).toBeVisible();
  // Expect Challenge to be visible
  await expect(page.getByTestId('challenge')).toBeVisible();
  // Expect Terms and Conditions accordion to be visible
  await expect(page.getByRole('button', { name: 'Terms and conditions' })).toBeVisible();
  // Expect Single accordion to be visible
  await expect(page.getByRole('button', { name: '1st Accordion' })).toBeVisible();
  await expect(page.getByRole('button', { name: '2nd Accordion' })).toBeVisible();
  await expect(page.getByRole('button', { name: '3rd Accordion' })).toBeVisible();
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
    await page.goto('/public/accordion');
    await page.getByRole('button', { name: 'Terms and conditions' }).click();
    // Check if the accordion content is visible
    const accordionContent = page.getByTestId('termsContent');
    await expect(accordionContent).toBeVisible();
    // Check 1st T & C
    await expect(accordionContent.locator(page.getByRole('heading', { name: 'Acceptance of Terms' }))).toBeVisible();
    // Check last T & C
    await expect(accordionContent.locator(page.getByRole('heading', { name: 'Contact Us' }))).toBeVisible();
    // Check Terms and Conditions checkbox is visible
    await expect(page.getByRole('checkbox', { name: 'Accept terms and conditions' })).toBeVisible();
    // Check Terms and Conditions checkbox is unchecked
    const checkbox = page.getByRole('checkbox', { name: 'Accept terms and conditions' });
    const isChecked = await checkbox.isChecked();
    expect(isChecked).toBe(false);
    
});

test('Accordion page - check terms and conditions', async ({ page }) => {
    // click on the Terms and Conditions accordion
    await page.goto('/public/accordion');
    await page.getByRole('button', { name: 'Terms and conditions' }).click();
    // Check checkbox is unchecked
    const checkbox = page.getByRole('checkbox', { name: 'Accept terms and conditions' });
    const isChecked = await checkbox.isChecked();
    expect(isChecked).toBe(false);
    // Check if the checkbox can be checked
    await checkbox.check();
    // Check if the checkbox is checked
    const isCheckedAfter = await checkbox.isChecked();
    expect(isCheckedAfter).toBe(true);
    // Check if the result text is updated
    const resultText = await page.locator('#tAndCResult').innerText();
    expect(resultText).toBe('Terms and Conditions: true');
});

test('Accordion page - expand single accordion', async ({ page }) => {
    // click on the Single accordion
    await page.goto('/public/accordion');
    await page.getByRole('button', { name: '1st Accordion' }).click();
    const firstAccordion = page.getByRole('button', { name: '1st Accordion' });
    const secondAccordion = page.getByRole('button', { name: '2nd Accordion' });
    const thirdAccordion = page.getByRole('button', { name: '3rd Accordion' });
    // Check if only one accordion is expanded
    await expect(firstAccordion).toHaveAttribute('data-state', 'open');
    await expect(secondAccordion).toHaveAttribute('data-state', 'closed');
    await expect(thirdAccordion).toHaveAttribute('data-state', 'closed');
    // Check if the content of the first accordion is visible
    await expect(page.getByText('Content 1', {exact: true})).toBeVisible();
    // Check if the content of the second accordion is not visible
    await expect(page.getByText('Content 2', {exact: true})).toBeHidden();
    // Check if the content of the third accordion is not visible
    await expect(page.getByText('Content 3', {exact: true})).toBeHidden();

    // Select 2nd Accordion
    await secondAccordion.click();
    // Check if the 2nd accordion is expanded
    await expect(secondAccordion).toHaveAttribute('data-state', 'open');
    await expect(firstAccordion).toHaveAttribute('data-state', 'closed');
    await expect(thirdAccordion).toHaveAttribute('data-state', 'closed');
    // Check if the content of the second accordion is visible
    await expect(page.getByText('Content 2', {exact: true})).toBeVisible();
    // Check if the content of the first accordion is not visible
    await expect(page.getByText('Content 1', {exact: true})).toBeHidden();
    // Check if the content of the third accordion is not visible
    await expect(page.getByText('Content 3', {exact: true})).toBeHidden();
    // Select 3rd Accordion
    await thirdAccordion.click();
    // Check if the 3rd accordion is expanded
    await expect(thirdAccordion).toHaveAttribute('data-state', 'open');
    await expect(secondAccordion).toHaveAttribute('data-state', 'closed');
    await expect(firstAccordion).toHaveAttribute('data-state', 'closed');
    // Check if the content of the third accordion is visible
    await expect(page.getByText('Content 3', {exact: true})).toBeVisible();
    // Check if the content of the first accordion is not visible
    await expect(page.getByText('Content 1', {exact: true})).toBeHidden();
    // Check if the content of the second accordion is not visible
    await expect(page.getByText('Content 2', {exact: true})).toBeHidden();

});

test('Accordion page - expand multiple accordion', async ({ page }) => {
    // click on the Multiple accordion
    await page.goto('/public/accordion');
    await page.getByRole('button', { name: 'Item 1' }).click();
    const firstAccordion = page.getByRole('button', { name: 'Item 1' });
    const secondAccordion = page.getByRole('button', { name: 'Item 2' });
    const thirdAccordion = page.getByRole('button', { name: 'Item 3' });
    // Check if the first accordion is expanded
    await expect(firstAccordion).toHaveAttribute('data-state', 'open');
    // Check if the content of the first accordion is visible
    await expect(page.getByText('Content 1', {exact: true})).toBeVisible();
    
    // Select 2nd Accordion
    await secondAccordion.click();
    // Check if the 2nd accordion is expanded
    await expect(secondAccordion).toHaveAttribute('data-state', 'open');
    // Check if the content of the second accordion is visible
    await expect(page.getByText('Content 2', {exact: true})).toBeVisible();
    
    // Select 3rd Accordion
    await thirdAccordion.click();
    // Check if the 3rd accordion is expanded
    await expect(thirdAccordion).toHaveAttribute('data-state', 'open');
    // Check if the content of the third accordion is visible
    await expect(page.getByText('Content 3', {exact: true})).toBeVisible();
    // Check all accordions are expanded
    await expect(firstAccordion).toHaveAttribute('data-state', 'open');
    await expect(secondAccordion).toHaveAttribute('data-state', 'open');
    await expect(thirdAccordion).toHaveAttribute('data-state', 'open');

});

test('Accordion page - check tabs', async ({ page }) => {
    // click on the Tabs
    await page.goto('/public/accordion');
    const tab1 = page.getByRole('tab', { name: 'Tab 1' });
    const tab2 = page.getByRole('tab', { name: 'Tab 2' });
    const tab3 = page.getByRole('tab', { name: 'Tab 3' });
    // Check if the first tab is selected
    await expect(tab1).toHaveAttribute('aria-selected', 'true');
    // Check if the content of the first tab is visible
    await expect(page.getByText('Item 1 in tab 1')).toBeVisible();
    
    // Select 2nd Tab
    await tab2.click();
    // Check if the 2nd tab is selected
    await expect(tab2).toHaveAttribute('aria-selected', 'true');
    // Check if the content of the second tab is visible
    await expect(page.getByText('Item 1 in tab 2')).toBeVisible();
    
    // Select 3rd Tab
    await tab3.click();
    // Check if the 3rd tab is selected
    await expect(tab3).toHaveAttribute('aria-selected', 'true');
    // Check if the content of the third tab is visible
    await expect(page.getByText('Item 1 in tab 3')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Checkbox' })).toBeVisible();
});


