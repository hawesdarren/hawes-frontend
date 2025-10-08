import { expect, test } from '@playwright/test';
import { CheckboxPage } from './pom/checkbox';

test.describe('Checkbox Tests', () => {
  let checkboxPage: CheckboxPage;

test.beforeEach(async ({ page }) => {
    checkboxPage = new CheckboxPage(page);
    await page.goto('/public/checkbox');
    await expect(checkboxPage.heading).toBeVisible();
    await expect(checkboxPage.challenge).toBeVisible();
    await expect(checkboxPage.heading).toHaveText('Checkbox');
});

test('Single Checkbox', async ({ page }) => {
   
  await expect(checkboxPage.singleCheckbox).toBeVisible();
  await expect(checkboxPage.singleCheckbox).not.toBeChecked()
  await checkboxPage.singleCheckbox.check();
  await expect(checkboxPage.singleCheckbox).toBeChecked();
  // Confirm that the checkbox is checked
  await expect(checkboxPage.singleCheckboxResult).toBeVisible();
  await expect(checkboxPage.singleCheckboxResult).toHaveText('Terms and Conditions: true');
});

test('Default checkbox', async ({ page }) => {
    
    expect (await checkboxPage.defaultCheckbox.isVisible());
    await expect(checkboxPage.defaultCheckbox).toBeChecked();
    await checkboxPage.defaultCheckbox.uncheck();
    await expect(checkboxPage.defaultCheckbox).not.toBeChecked();
    // Confirm that the checkbox is checked
    await expect(checkboxPage.defaultCheckboxResult).toBeVisible();
    await expect(checkboxPage.defaultCheckboxResult).toHaveText('Opt in: false');
});

test('Disabled checkbox', async ({ page }) => {
    
    await expect(checkboxPage.disabledCheckbox).toBeVisible();
    await expect(checkboxPage.disabledCheckbox).toBeDisabled();
    // Attempt to click the disabled checkbox
    await checkboxPage.disabledCheckbox.click({ force: true });
    // Confirm that the checkbox is still disabled
    await expect(checkboxPage.disabledCheckbox).toBeDisabled();
});

test('Multiple checkboxes', async ({ page }) => {
    
    await expect(checkboxPage.multipleCheckboxesSection).toBeVisible();
    await expect(checkboxPage.multipleCheckboxesCheckbox1).toBeVisible();
    await expect(checkboxPage.multipleCheckboxesCheckbox2).toBeVisible();
    await expect(checkboxPage.multipleCheckboxesCheckbox3).toBeVisible();
    await expect(checkboxPage.multipleCheckboxesSubmitButton).toBeVisible();

    // Check the first checkbox
    await checkboxPage.multipleCheckboxesCheckbox1.check();
    await expect(checkboxPage.multipleCheckboxesCheckbox1).toBeChecked();

    // Check the second checkbox
    await checkboxPage.multipleCheckboxesCheckbox2.check();
    await expect(checkboxPage.multipleCheckboxesCheckbox2).toBeChecked();

    // Uncheck the first checkbox
    await checkboxPage.multipleCheckboxesCheckbox1.uncheck();
    await expect(checkboxPage.multipleCheckboxesCheckbox1).not.toBeChecked();

    // Check the third checkbox
    await checkboxPage.multipleCheckboxesCheckbox3.check();
    await expect(checkboxPage.multipleCheckboxesCheckbox3).toBeChecked();

    // Submit the form
    await checkboxPage.multipleCheckboxesSubmitButton.click();

    // Confirm that the results are displayed correctly
    await expect(checkboxPage.multipleCheckboxesResult).toBeVisible();
    await expect(checkboxPage.multipleCheckboxesResult).toHaveText('Selected options:Option 2Option 3'); //Playwright removes extar whitespace and line breaks
});

test("Select any two checkboxes", async ({ page }) => {
    
    //const warningMessage = selectTwoCheckboxesSection.locator('#anyTwoErrorMessage');

    await expect(checkboxPage.anyTwoCheckboxesSection).toBeVisible();
    await expect(checkboxPage.anyTwoCheckboxesCheckbox1).toBeVisible();
    await expect(checkboxPage.anyTwoCheckboxesCheckbox2).toBeVisible();
    await expect(checkboxPage.anyTwoCheckboxesCheckbox3).toBeVisible();
    await expect(checkboxPage.anyTwoCheckboxesCheckbox4).toBeVisible();
    await expect(checkboxPage.anyTwoCheckboxesCheckbox5).toBeVisible();
    await expect(checkboxPage.anyTwoCheckboxesSubmitButton).toBeVisible();

    // Check the first checkbox
    await checkboxPage.anyTwoCheckboxesCheckbox1.check();
    await expect(checkboxPage.anyTwoCheckboxesCheckbox1).toBeChecked();

    // Check the second checkbox
    await checkboxPage.anyTwoCheckboxesCheckbox2.check();
    await expect(checkboxPage.anyTwoCheckboxesCheckbox2).toBeChecked();

    // Check the third checkbox 
    await checkboxPage.anyTwoCheckboxesCheckbox3.check();
    await expect(checkboxPage.anyTwoCheckboxesCheckbox3).toBeChecked();
    // Check warning message
    await expect(checkboxPage.anyTwoCheckboxesWarningMessage).toBeVisible();
    await expect(checkboxPage.anyTwoCheckboxesWarningMessage).toHaveText('Only two may be checked');

    // Uncheck the first checkbox
    await checkboxPage.anyTwoCheckboxesCheckbox1.uncheck();
    await expect(checkboxPage.anyTwoCheckboxesCheckbox1).not.toBeChecked();  
    // Check the warning message again
    await expect(checkboxPage.anyTwoCheckboxesWarningMessage).not.toBeVisible(); 

    // Submit the form
    await checkboxPage.anyTwoCheckboxesSubmitButton.click();

    // Confirm that the results are displayed correctly
    await expect(checkboxPage.anyTwoCheckboxesResult).toBeVisible();
    await expect(checkboxPage.anyTwoCheckboxesResult).toHaveText('Selected options:Option 2Option 3'); //Playwright removes exta whitespace and line breaks
});

test("Select all checkboxes", async ({ page }) => {
   
    await expect(checkboxPage.selectAllCheckboxesSection).toBeVisible();
    await expect(checkboxPage.selectAllCheckboxesCheckbox1).toBeVisible();
    await expect(checkboxPage.selectAllCheckboxesCheckbox2).toBeVisible();
    await expect(checkboxPage.selectAllCheckboxesCheckbox3).toBeVisible();
    await expect(checkboxPage.selectAllCheckboxesCheckbox4).toBeVisible();
    await expect(checkboxPage.selectAllCheckboxesCheckbox5).toBeVisible();
    await expect(checkboxPage.selectAllCheckboxesCheckboxAll).toBeVisible();
    await expect(checkboxPage.selectAllCheckboxesSubmitButton).toBeVisible();

    // Click the "Select All" button
    await checkboxPage.selectAllCheckboxesCheckboxAll.check();

    // Confirm that all checkboxes are checked
    await expect(checkboxPage.selectAllCheckboxesCheckbox1).toBeChecked();
    await expect(checkboxPage.selectAllCheckboxesCheckbox2).toBeChecked();
    await expect(checkboxPage.selectAllCheckboxesCheckbox3).toBeChecked();
    await expect(checkboxPage.selectAllCheckboxesCheckbox4).toBeChecked();
    await expect(checkboxPage.selectAllCheckboxesCheckbox5).toBeChecked();

    // Uncheck all checkboxes
    await checkboxPage.selectAllCheckboxesCheckboxAll.uncheck();

    // Confirm that all checkboxes are unchecked
    await expect(checkboxPage.selectAllCheckboxesCheckbox1).not.toBeChecked();
    await expect(checkboxPage.selectAllCheckboxesCheckbox2).not.toBeChecked();
    await expect(checkboxPage.selectAllCheckboxesCheckbox3).not.toBeChecked();
    await expect(checkboxPage.selectAllCheckboxesCheckbox4).not.toBeChecked();
    await expect(checkboxPage.selectAllCheckboxesCheckbox5).not.toBeChecked();  

    // Check the first checkbox
    await checkboxPage.selectAllCheckboxesCheckbox1.check();
    await expect(checkboxPage.selectAllCheckboxesCheckbox1).toBeChecked();  

    // Submit the from
    await checkboxPage.selectAllCheckboxesSubmitButton.click();
    // Check error message
    await expect(checkboxPage.selectAllCheckboxesMessage).toBeVisible();
    await expect(checkboxPage.selectAllCheckboxesMessage).toHaveText('Selected options: All options MUST be selected'); 
    
    // Check the remaining checkboxes
    await checkboxPage.selectAllCheckboxesCheckbox2.check();
    await expect(checkboxPage.selectAllCheckboxesCheckbox2).toBeChecked();
    await checkboxPage.selectAllCheckboxesCheckbox3.check();
    await expect(checkboxPage.selectAllCheckboxesCheckbox3).toBeChecked();
    await checkboxPage.selectAllCheckboxesCheckbox4.check();
    await expect(checkboxPage.selectAllCheckboxesCheckbox4).toBeChecked();
    await checkboxPage.selectAllCheckboxesCheckbox5.check();
    await expect(checkboxPage.selectAllCheckboxesCheckbox5).toBeChecked();  

    // Submit the form again
    await checkboxPage.selectAllCheckboxesSubmitButton.click(); 
    // Confirm that the results are displayed correctly
    await expect(checkboxPage.selectAllCheckboxesMessage).toHaveText('Selected options: All options selected');

});
});