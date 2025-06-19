import { expect, test } from '@playwright/test';

test('Checkboxes - Single Checkbox', async ({ page }) => {
  await page.goto('/public/checkbox');
  //const checkbox = page.locator('#termsandconditions');
  const checkbox = page.getByLabel('Accept terms and conditions');
  await expect(checkbox).toBeVisible();
  await expect(checkbox).not.toBeChecked()
  await checkbox.click();
  await expect(checkbox).toBeChecked();
  // Confirm that the checkbox is checked
  const tAndCResult = page.locator('#tAndCResult');
  await expect(tAndCResult).toBeVisible();
  await expect(tAndCResult).toHaveText('Terms and Conditions: true');
});

test('Checkboxes - Default checkbox', async ({ page }) => {
    await page.goto('/public/checkbox');
    //const defaultCheckbox = page.getByLabel('Send specials and newsletters');
    const defaultCheckbox = page.locator('#optIn');
    expect (await defaultCheckbox.isVisible());
    //await expect(defaultCheckbox).toBeVisible();
    await expect(defaultCheckbox).toBeChecked();
    await defaultCheckbox.click();
    await expect(defaultCheckbox).not.toBeChecked();
    // Confirm that the checkbox is checked
    const defaultResult = page.locator('#optInResult');
    await expect(defaultResult).toBeVisible();
    await expect(defaultResult).toHaveText('Opt in: false');
});

test('Checkboxes - Disabled checkbox', async ({ page }) => {
    await page.goto('/public/checkbox');
    const disabledCheckbox = page.getByLabel('Disabled');
    await expect(disabledCheckbox).toBeVisible();
    await expect(disabledCheckbox).toBeDisabled();
    // Attempt to click the disabled checkbox
    await disabledCheckbox.click({ force: true });
    // Confirm that the checkbox is still disabled
    await expect(disabledCheckbox).toBeDisabled();
});

test('Checkboxes - Multiple checkboxes', async ({ page }) => {
    await page.goto('/public/checkbox');
    const multipleCheckboxesSection = page.getByTestId('multiCheckboxes');
    const checkbox1 = multipleCheckboxesSection.getByRole('checkbox', { name: 'Option 1' });
    const checkbox2 = multipleCheckboxesSection.getByRole('checkbox', { name: 'Option 2' });
    const checkbox3 = multipleCheckboxesSection.getByRole('checkbox', { name: 'Option 3' });
    const submitButton = multipleCheckboxesSection.getByRole('button', { name: 'Submit' });
    await expect(multipleCheckboxesSection).toBeVisible();
    await expect(checkbox1).toBeVisible();
    await expect(checkbox2).toBeVisible();
    await expect(checkbox3).toBeVisible();

    await expect(submitButton).toBeVisible();

    // Check the first checkbox
    await checkbox1.click();
    await expect(checkbox1).toBeChecked();

    // Check the second checkbox
    await checkbox2.click();
    await expect(checkbox2).toBeChecked();

    // Uncheck the first checkbox
    await checkbox1.click();
    await expect(checkbox1).not.toBeChecked();

    // Check the third checkbox
    await checkbox3.click();
    await expect(checkbox3).toBeChecked();

    // Submit the form
    await submitButton.click();

    // Confirm that the results are displayed correctly
    const multipleResult = multipleCheckboxesSection.locator('#multipleOptResult');
    await expect(multipleResult).toBeVisible();
    await expect(multipleResult).toHaveText('Options selected:Option 2Option 3'); //Playwright removes extar whitespace and line breaks
});

test("Checkboxes - Select any two checkboxes", async ({ page }) => {
    await page.goto('/public/checkbox');
    const selectTwoCheckboxesSection = page.getByTestId('anyTwoCheckboxes');
    const checkbox1 = selectTwoCheckboxesSection.getByRole('checkbox', { name: 'Option 1' });
    const checkbox2 = selectTwoCheckboxesSection.getByRole('checkbox', { name: 'Option 2' });
    const checkbox3 = selectTwoCheckboxesSection.getByRole('checkbox', { name: 'Option 3' });
    const checkbox4 = selectTwoCheckboxesSection.getByRole('checkbox', { name: 'Option 4' });
    const checkbox5 = selectTwoCheckboxesSection.getByRole('checkbox', { name: 'Option 5' });
    const submitButton = selectTwoCheckboxesSection.getByRole('button', { name: 'Submit' });
    const warningMessage = selectTwoCheckboxesSection.locator('#anyTwoErrorMessage');

    await expect(selectTwoCheckboxesSection).toBeVisible();
    await expect(checkbox1).toBeVisible();
    await expect(checkbox2).toBeVisible();
    await expect(checkbox3).toBeVisible();
    await expect(checkbox4).toBeVisible();
    await expect(checkbox5).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Check the first checkbox
    await checkbox1.click();
    await expect(checkbox1).toBeChecked();

    // Check the second checkbox
    await checkbox2.click();
    await expect(checkbox2).toBeChecked();

    // Attempt to check the third checkbox (should not be allowed)
    await checkbox3.click();
    await expect(checkbox3).toBeChecked();
    // Check warning message
    await expect(warningMessage).toBeVisible();
    await expect(warningMessage).toHaveText('Only two may be checked');

    // Uncheck the first checkbox
    await checkbox1.click();
    await expect(checkbox1).not.toBeChecked();  
    // Check the warning message again
    await expect(warningMessage).not.toBeVisible(); 

    // Submit the form
    await submitButton.click();

    // Confirm that the results are displayed correctly
    const selectTwoResult = selectTwoCheckboxesSection.locator('#anyTwoResult');
    await expect(selectTwoResult).toBeVisible();
    await expect(selectTwoResult).toHaveText('Selected options:Option 2Option 3'); //Playwright removes exta whitespace and line breaks
});

test("Checkboxes - Select all checkboxes", async ({ page }) => {
    await page.goto('/public/checkbox');
    const selectAllCheckboxesSection = page.getByTestId('allCheckboxes');
    const checkbox1 = selectAllCheckboxesSection.getByRole('checkbox', { name: 'Option 1' });
    const checkbox2 = selectAllCheckboxesSection.getByRole('checkbox', { name: 'Option 2' });
    const checkbox3 = selectAllCheckboxesSection.getByRole('checkbox', { name: 'Option 3' });
    const checkbox4 = selectAllCheckboxesSection.getByRole('checkbox', { name: 'Option 4' });
    const checkbox5 = selectAllCheckboxesSection.getByRole('checkbox', { name: 'Option 5' });
    const checkboxAll = selectAllCheckboxesSection.getByRole('checkbox', { name: 'All' });
    const submitButton = selectAllCheckboxesSection.getByRole('button', { name: 'Submit' });

    await expect(selectAllCheckboxesSection).toBeVisible();
    await expect(checkbox1).toBeVisible();
    await expect(checkbox2).toBeVisible();
    await expect(checkbox3).toBeVisible();
    await expect(checkbox4).toBeVisible();
    await expect(checkbox5).toBeVisible();
    await expect(checkboxAll).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Click the "Select All" button
    await checkboxAll.click();

    // Confirm that all checkboxes are checked
    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).toBeChecked();
    await expect(checkbox3).toBeChecked();
    await expect(checkbox4).toBeChecked();
    await expect(checkbox5).toBeChecked();

    // Uncheck all checkboxes
    await checkboxAll.click();

    // Confirm that all checkboxes are unchecked
    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).not.toBeChecked();
    await expect(checkbox3).not.toBeChecked();
    await expect(checkbox4).not.toBeChecked();
    await expect(checkbox5).not.toBeChecked();  

    // Check the first checkbox
    await checkbox1.click();
    await expect(checkbox1).toBeChecked();  

    // Submit the from
    await submitButton.click();
    // Check error message
    const selectAllErrorMessage = selectAllCheckboxesSection.locator('#onCheckAllMessage');
    await expect(selectAllErrorMessage).toBeVisible();
    await expect(selectAllErrorMessage).toHaveText('Selected options: All options MUST be selected'); 
    
    // Check the remaining checkboxes
    await checkbox2.click();
    await expect(checkbox2).toBeChecked();
    await checkbox3.click();
    await expect(checkbox3).toBeChecked();
    await checkbox4.click();
    await expect(checkbox4).toBeChecked();
    await checkbox5.click();
    await expect(checkbox5).toBeChecked();  

    // Submit the form again
    await submitButton.click(); 
    // Confirm that the results are displayed correctly
    await expect(selectAllErrorMessage).toHaveText('Selected options: All options selected');

});