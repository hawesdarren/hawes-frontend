import { test, expect } from '@playwright/test';
import  { ComboboxPage } from './pom/combobox'

test.describe('Combobox tests', () => {
  let comboboxPage: ComboboxPage;

test.beforeEach(async ({ page }) => {

    await page.goto('/public/combobox');
    comboboxPage = new ComboboxPage(page);
    // Expect heading to be visible
    await expect(comboboxPage.heading).toBeVisible();
    await expect(comboboxPage.heading).toHaveText('Combobox')
});

test('Static combobox selection', async ({ page }) => {
    await expect(comboboxPage.staticComboboxHeader).toBeVisible();
    await expect(comboboxPage.staticCombobox).toBeVisible();

    // Select an option from the static combobox
    await comboboxPage.staticCombobox.click();
    await comboboxPage.page.getByRole('option', { name: 'Banana' }).click();
    await expect(comboboxPage.staticComboboxSelected).toHaveText('Selected: Banana');
});

test('Static combobox keyboard navigation', async ({ page }) => {
    await expect(comboboxPage.staticComboboxHeader).toBeVisible();
    await expect(comboboxPage.staticCombobox).toBeVisible();

    // Open the combobox using keyboard and select an option
    await comboboxPage.staticCombobox.focus();
    await comboboxPage.page.keyboard.press('Enter');
    await comboboxPage.page.keyboard.press('ArrowDown');
    await comboboxPage.page.keyboard.press('ArrowDown');
    await comboboxPage.page.keyboard.press('Enter');
    await expect(comboboxPage.staticComboboxSelected).toHaveText('Selected: Blueberry');  
});

test('Static combobox filtering', async ({ page }) => {
    await expect(comboboxPage.staticComboboxHeader).toBeVisible();
    await expect(comboboxPage.staticCombobox).toBeVisible();

    // Type to filter options
    await comboboxPage.staticCombobox.click();
    await comboboxPage.page.getByPlaceholder('Search fruit...').fill('Ch');
    const options = comboboxPage.page.getByRole('option');
    await expect(options).toHaveCount(1);
    await expect(options.first()).toHaveText('Peach');

    // Select the filtered option
    await options.first().click();
    await expect(comboboxPage.staticComboboxSelected).toHaveText('Selected: Peach');
});

test('Static combobox filtering - none found', async ({ page }) => {
    await expect(comboboxPage.staticComboboxHeader).toBeVisible();
    await expect(comboboxPage.staticCombobox).toBeVisible();

    // Type to filter options
    await comboboxPage.staticCombobox.click();
    await comboboxPage.page.getByPlaceholder('Search fruit...').fill('Lemon');
    const options = comboboxPage.page.getByRole('option');
    await expect(options).toHaveCount(0);
    await expect(comboboxPage.page.getByRole('presentation').getByText('No fruit found')).toBeVisible();

});

test('Dynamic combobox selection', async ({ page }) => {
    await expect(comboboxPage.dynamicComboboxHeader).toBeVisible();
    await expect(comboboxPage.dynamicCombobox).toBeVisible();

    // Select an option from the dynamic combobox
    await comboboxPage.dynamicCombobox.click();
    await comboboxPage.page.getByRole('option', { name: '42-7654-321098765-43' }).click();
    await expect(comboboxPage.dynamicComboboxSelected).toHaveText('Selected: 42-7654-321098765-43');
});

test('Dynamic combobox keyboard navigation', async ({ page }) => {
    await expect(comboboxPage.dynamicComboboxHeader).toBeVisible();
    await expect(comboboxPage.dynamicCombobox).toBeVisible();

    // Open the combobox using keyboard and select an option
    await comboboxPage.dynamicCombobox.focus();
    await comboboxPage.page.keyboard.press('Enter');
    await comboboxPage.page.keyboard.press('ArrowDown');
    await comboboxPage.page.keyboard.press('ArrowDown');
    await comboboxPage.page.keyboard.press('ArrowDown');
    await comboboxPage.page.keyboard.press('Enter');
    await expect(comboboxPage.dynamicComboboxSelected).toHaveText('Selected: 42-7890-123456789-01');   
});

test('Dynamic combobox filtering', async ({ page }) => {
    await expect(comboboxPage.dynamicComboboxHeader).toBeVisible();
    await expect(comboboxPage.dynamicCombobox).toBeVisible();

    // Type to filter options
    await comboboxPage.dynamicCombobox.click();
    await comboboxPage.page.getByPlaceholder('Search accounts...').fill('3456');
    const options = comboboxPage.page.getByRole('option');
    await expect(options).toHaveCount(3);
    await expect(options.first()).toContainText('42-3456-789012345-67');

    // Select the filtered option
    await options.first().click();
    await expect(comboboxPage.dynamicComboboxSelected).toHaveText('Selected: 42-3456-789012345-67');
});

test('Dynamic combobox filtering- none found', async ({ page }) => {
    await expect(comboboxPage.dynamicComboboxHeader).toBeVisible();
    await expect(comboboxPage.dynamicCombobox).toBeVisible();

    // Type to filter options
    await comboboxPage.dynamicCombobox.click();
    await comboboxPage.page.getByPlaceholder('Search accounts...').fill('boat');
    const options = comboboxPage.page.getByRole('option');
    await expect(options).toHaveCount(0);
    await expect(comboboxPage.page.getByRole('presentation').getByText('No accounts found')).toBeVisible();

});

});