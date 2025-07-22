import { TablesPage } from './pom/tables'
import { test, expect } from '@playwright/test'


async function getFirstNames(rows: any[])  {
    const firstNames: string[] = [];
    // Get the first names form the table
    for (const row of rows) {
                    const firstNameCell = await row.getByRole('cell').first();
                    const firstName = await firstNameCell.textContent();
                    if (firstName) {
                        firstNames.push(firstName.trim());
                    }
                }
  
    return firstNames;
}


async function getLastNames(rows: any[])  {
    const lastNames: string[] = [];
    // Get the first names form the table
    for (const row of rows) {
                    const lastNameCell = await row.getByRole('cell').nth(1);
                    const lastName = await lastNameCell.textContent();
                    if (lastName) {
                        lastNames.push(lastName.trim());
                    }
                }
  
    return lastNames;
}

async function getDoB(rows: any[])  {
    const dobs: Date[] = [];
    // Get the first names form the table
    for (const row of rows) {
                    const dobCell = await row.getByRole('cell').last();
                    const dob = await dobCell.textContent();
                    if (dob) {
                        // Convert string to Date
                        const date = new Date(dob.trim());
                        dobs.push(date);
                    }
                }
  
    return dobs;
}

test.describe('Tables Tests', () => {

    let tablesPage: TablesPage;

        test.beforeEach(async ({ page }) => {
            
            await page.goto('/public/tables')
            tablesPage = new TablesPage(page)
            await expect(tablesPage.header).toHaveText('Tables')
            await expect(tablesPage.paymentsTable).toBeVisible();
            await expect(tablesPage.dobTable).toBeVisible();
        });

        test(`Payments contains payment Mojo's coffe $7.50`, async ({ page }) => {
            
            // Find row that have mojos coffee
            const MojosRows = page.getByRole('row').filter({hasText: `Mojos's`})
            expect(MojosRows).toHaveCount(2)
            // Check one of them is for $7.50
            expect (MojosRows.filter({hasText: `$7.50`})).toHaveCount(1)


        });

        test(`Payments contains two payments to Mojo's coffe`, async ({ page }) => {
             
            // Find row that have mojos coffee
            const MojosRows = page.getByRole('row').filter({hasText: `Mojos's`})
            expect(MojosRows).toHaveCount(2)
            
        });

          test(`Payments contains two payments for $7.50`, async ({ page }) => {
            
            // Find row that have mojos coffee
            const MojosRows = page.getByRole('row').filter({hasText: `$7.50`})
            expect(MojosRows).toHaveCount(2)
            
        });

        test(`DoB filter by first name`, async ({ page }) => {
            // Get the table body and then get all the first names
            const rows = await tablesPage.dobBody.getByRole('row').all();
            // Get first names form the table
            const firstNames = await getFirstNames(rows)
            // Sort the first names alphabetically
            firstNames.sort((a, b) => a.localeCompare(b));

            // Click the button to sort the table A-Z
            await tablesPage.firstName.click();
            // Wait for table to sort
            await page.waitForTimeout(1000);
            // Get the first names from the table 
            const firstNamesSorted: string[] = await getFirstNames(rows);
            // Compare the list
            expect(firstNamesSorted).toEqual(firstNames);

            // Reverse the sort order Z-A
            await tablesPage.firstName.click();
            // Wait for table to sort
            await page.waitForTimeout(1000);
            // Get the first names from the table
            const firstNamesResverseSorted: string[] = await getFirstNames(rows);
            // Sort the stored list of names Z-A
            firstNames.sort((a, b) => b.localeCompare(a));
            // Compare the list
            expect(firstNamesResverseSorted).toEqual(firstNames);

        });

        test(`DoB filter by last name`, async ({ page }) => {
            // Get the table body and then get all the last names
            const rows = await tablesPage.dobBody.getByRole('row').all();
            // Get the last names from the table
            const lastNames = await getLastNames(rows);
            // Sort A-Z
            lastNames.sort((a, b) => a.localeCompare(b));

            // Click Last name button to sort A-Z
            await tablesPage.lastName.click();
            // Wait for table to sort
            await page.waitForTimeout(1000);
            // Get the last names from the table
            const lastNamesAZ = await getLastNames(rows);
            // Compare the list
            expect(lastNamesAZ).toEqual(lastNames);

            // Click the last name buton to sort Z-A
            await tablesPage.lastName.click();
            // Wait for table to sort
            await page.waitForTimeout(1000);
            // Get the last names from the table
            const lastNamesZA = await getLastNames(rows)
            // Sort Z-A original list
            lastNames.sort((a, b) => b.localeCompare(a));
            // Compare the list
            expect(lastNamesZA).toEqual(lastNames)

        });

        test(`DoB filter by DoB`, async ({ page }) => {
            // wait for page to load - need local formatting to take effect
            await page.waitForTimeout(1000)
            // Get the table body and then get all the last names
            const rows = await tablesPage.dobBody.getByRole('row').all();
            // Get the DoB from the table
            let dob = await getDoB(rows)
            dob = dob.map(d => typeof d === 'string' ? new Date(d) : d);
            // Sort date asc
            dob.sort((a, b) => a.getTime() - b.getTime());
            // Click the Date of birth button to Sort 0-9
            await tablesPage.dob.click();
            // Wait for table to sort
            await page.waitForTimeout(1000);
            // Get the DoB from the table
            const dob09 = await getDoB(rows);
            // Compare
            expect(dob09).toEqual(dob)

            // Click the DoB button to sort table 9-0
            await tablesPage.dob.click();
            // Wait for table to sort
            await page.waitForTimeout(1000);
            // Get the DoB from the table
            const dob90 = await getDoB(rows);
            // Sort the original list 9-0
            dob.sort((a, b) => b.getTime() - a.getTime());
            // Compare
            expect(dob90).toEqual(dob);

        });

});