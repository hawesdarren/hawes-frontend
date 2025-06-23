import { test, expect } from '@playwright/test';

test('Radio buttons - Triple option selection', async ({ page }) => {
  await page.goto('public/radio-buttons');

  // Elements
  const radioButtonGroup = page.getByTestId('triple-option-radio-group');
  const option1 = radioButtonGroup.locator('div').filter({ hasText: 'Option One' }).getByRole('radio');
  const option2 = radioButtonGroup.locator('div').filter({ hasText: 'Option Two' }).getByRole('radio');
  const option3 = radioButtonGroup.locator('div').filter({ hasText: 'Option Three' }).getByRole('radio');
  const selectedOptionText = radioButtonGroup.locator('#selectedOption');
  await expect(radioButtonGroup).toBeVisible();
  // Select the first radio button
  await option1.check();
  await expect(option1).toBeChecked();
  await expect(option2).not.toBeChecked();
  await expect(option3).not.toBeChecked();
  await expect(selectedOptionText).toHaveText('Selected item:Option One');

  // Select the second radio button
  await option2.check();
  await expect(option1).not.toBeChecked();
  await expect(option2).toBeChecked();
  await expect(option3).not.toBeChecked();
  await expect(selectedOptionText).toHaveText('Selected item:Option Two');

  // Select the third radio button
  await option3.check();
  await expect(option1).not.toBeChecked();
  await expect(option2).not.toBeChecked();
  await expect(option3).toBeChecked();
  await expect(selectedOptionText).toHaveText('Selected item:Option Three');
  

});

test('Radio buttons - Default value selection', async ({ page }) => {
  await page.goto('public/radio-buttons');

  // Elements
  const defaultRadioGroup = page.getByRole('radiogroup').filter({ has: page.getByRole('heading', { name: 'Default option' }) });
  const yesOption = defaultRadioGroup.locator('div').filter({ hasText: 'Yes' }).getByRole('radio');
  const noOption = defaultRadioGroup.locator('div').filter({ hasText: 'No' }).getByRole('radio');
  const selectedOptionText = defaultRadioGroup.locator('#selectedOptionTwo');

  await expect(defaultRadioGroup).toBeVisible();
  await expect(yesOption).toBeVisible();
  await expect(noOption).toBeVisible();

  // Check the default value
  await expect(yesOption).not.toBeChecked();
  await expect(noOption).toBeChecked();
  
  // Select the "Yes" option
  await yesOption.check();
  await expect(yesOption).toBeChecked();
  await expect(noOption).not.toBeChecked();
  await expect(selectedOptionText).toHaveText('Selected item:Yes');
});

test('Radio buttons - Double option with button', async ({ page }) => {
  await page.goto('public/radio-buttons');

  // Elements
  const doubleOptionGroup = page.getByTestId('double-option-radio-group-1');
  const option1 = doubleOptionGroup.locator('div').filter({ hasText: 'Option One' }).getByRole('radio');
  const option2 = doubleOptionGroup.locator('div').filter({ hasText: 'Option Two' }).getByRole('radio');
  const option3 = doubleOptionGroup.locator('div').filter({ hasText: 'Option Three' }).getByRole('radio');
  const doubleOptionGroup2 = page.getByTestId('double-option-radio-group-2');
  const optionYes = doubleOptionGroup2.locator('div').filter({ hasText: 'Yes' }).getByRole('radio');    
  const optionNo = doubleOptionGroup2.locator('div').filter({ hasText: 'No' }).getByRole('radio');
  const submitButton = page.getByRole('button', { name: 'Submit' });
  const selectedOptionThree = page.locator('#selectedOptionThree');

  await expect(doubleOptionGroup).toBeVisible();
  await expect(option1).toBeVisible();
  await expect(option2).toBeVisible();
  await expect(option3).toBeVisible();
  await expect(doubleOptionGroup2).toBeVisible();
  await expect(optionYes).toBeVisible();
  await expect(optionNo).toBeVisible();

  // Select the first radio button
  await option1.check();
  await expect(option1).toBeChecked();
  await expect(option2).not.toBeChecked();
  await expect(option3).not.toBeChecked();

  // Select the second radio button
  await option2.check();
  await expect(option1).not.toBeChecked();
  await expect(option2).toBeChecked();
  await expect(option3).not.toBeChecked();

  //Select Yes option
  await optionYes.check();
  await expect(optionYes).toBeChecked();
  await expect(optionNo).not.toBeChecked();

  // Submit the form
  await submitButton.click();

  // Check results
  await expect(selectedOptionThree).toHaveText('Options selected: Option TwoYes/No selected: Yes ');
});