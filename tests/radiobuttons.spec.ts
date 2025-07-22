import { test, expect } from '@playwright/test';
import  { RadioButtonsPage } from './pom/radioButtons'

test.describe('Radio button tests', () => {
  let radioButtonsPage: RadioButtonsPage;

test.beforeEach(async ({ page }) => {

    await page.goto('/public/radio-buttons');
    radioButtonsPage = new RadioButtonsPage(page);
    // Expect heading to be visible
    await expect(radioButtonsPage.header).toBeVisible();
    await expect(radioButtonsPage.header).toHaveText('Radio buttons')
});

test('Triple option selection', async ({ page }) => {
  
  await expect(radioButtonsPage.tripleOptionSection).toBeVisible();
  // Select the first radio button
  await radioButtonsPage.tripleOptionRadioButton1.check();
  await expect(radioButtonsPage.tripleOptionRadioButton1).toBeChecked();
  await expect(radioButtonsPage.tripleOptionRadioButton2).not.toBeChecked();
  await expect(radioButtonsPage.tripleOptionRadioButton3).not.toBeChecked();
  await expect(radioButtonsPage.tripleOptionResult).toHaveText('Selected item:Option One');

  // Select the second radio button
  await radioButtonsPage.tripleOptionRadioButton2.check();
  await expect(radioButtonsPage.tripleOptionRadioButton1).not.toBeChecked();
  await expect(radioButtonsPage.tripleOptionRadioButton2).toBeChecked();
  await expect(radioButtonsPage.tripleOptionRadioButton3).not.toBeChecked();
  await expect(radioButtonsPage.tripleOptionResult).toHaveText('Selected item:Option Two');

  // Select the third radio button
  await radioButtonsPage.tripleOptionRadioButton3.check();
  await expect(radioButtonsPage.tripleOptionRadioButton1).not.toBeChecked();
  await expect(radioButtonsPage.tripleOptionRadioButton2).not.toBeChecked();
  await expect(radioButtonsPage.tripleOptionRadioButton3).toBeChecked();
  await expect(radioButtonsPage.tripleOptionResult).toHaveText('Selected item:Option Three');
  

});

test('Default value selection', async ({ page }) => {
  

  await expect(radioButtonsPage.defaultOptionSection).toBeVisible();
  await expect(radioButtonsPage.defaultOptionRadioButtonYes).toBeVisible();
  await expect(radioButtonsPage.defaultOptionRadioButtonNo).toBeVisible();

  // Check the default value
  await expect(radioButtonsPage.defaultOptionRadioButtonYes).not.toBeChecked();
  await expect(radioButtonsPage.defaultOptionRadioButtonNo).toBeChecked();
  
  // Select the "Yes" option
  await radioButtonsPage.defaultOptionRadioButtonYes.check();
  await expect(radioButtonsPage.defaultOptionRadioButtonYes).toBeChecked();
  await expect(radioButtonsPage.defaultOptionRadioButtonNo).not.toBeChecked();
  await expect(radioButtonsPage.defaultOptionResult).toHaveText('Selected item:Yes');
});

test('Double option with button', async ({ page }) => {
  
  await expect(radioButtonsPage.doubleGroup1Section).toBeVisible();
  await expect(radioButtonsPage.doubleGroup1RadioButton1).toBeVisible();
  await expect(radioButtonsPage.doubleGroup1RadioButton2).toBeVisible();
  await expect(radioButtonsPage.doubleGroup1RadioButton3).toBeVisible();
  await expect(radioButtonsPage.doubleGroup2Section).toBeVisible();
  await expect(radioButtonsPage.doubleGroup2RadioButtonYes).toBeVisible();
  await expect(radioButtonsPage.doubleGroup2RadioButtonNo).toBeVisible();

  // Select the first radio button
  await radioButtonsPage.doubleGroup1RadioButton1.check();
  await expect(radioButtonsPage.doubleGroup1RadioButton1).toBeChecked();
  await expect(radioButtonsPage.doubleGroup1RadioButton2).not.toBeChecked();
  await expect(radioButtonsPage.doubleGroup1RadioButton3).not.toBeChecked();

  // Select the second radio button
  await radioButtonsPage.doubleGroup1RadioButton2.check();
  await expect(radioButtonsPage.doubleGroup1RadioButton1).not.toBeChecked();
  await expect(radioButtonsPage.doubleGroup1RadioButton2).toBeChecked();
  await expect(radioButtonsPage.doubleGroup1RadioButton3).not.toBeChecked();

  //Select Yes option
  await radioButtonsPage.doubleGroup2RadioButtonYes.check();
  await expect(radioButtonsPage.doubleGroup2RadioButtonYes).toBeChecked();
  await expect(radioButtonsPage.doubleGroup2RadioButtonNo).not.toBeChecked();

  // Submit the form
  await radioButtonsPage.doubleGroupSubmitButton.click();

  // Check results
  await expect(radioButtonsPage.doubleGroupResult).toHaveText('Options selected: Option Two\nYes/No selected: Yes ');
});
});