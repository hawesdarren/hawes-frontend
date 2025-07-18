import { test, expect } from '@playwright/test';
import { CalendarPage } from './pom/calendar';
import { Button } from '@/components/ui/button';

function formatDate(date: Date): string {
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = dayOfWeek[date.getDay()];
        const monthOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = monthOfYear[date.getMonth()];
        const dobButton = `${dayName}, ${monthName} ${date.getDate()}`;
        return dobButton
    }

test.describe('Calendar Tests', () => {
    let calendarPage: CalendarPage;

    test.beforeEach(async ({ page }) => {
        calendarPage = new CalendarPage(page);
        await page.goto('/public/calendar');
        await expect(page.getByRole('heading', { name: 'Calendar', exact: true, level: 1 })).toBeVisible();
    });

    test('Single calendar - Should select a date and display it', async ({page}) => {
        await expect(calendarPage.singleCalendar).toBeVisible();
        // Today + 2 days
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 2);
        const day = futureDate.getDate();
        // Select date
        const dobButton = formatDate(futureDate);
        await calendarPage.singleCalendar.getByLabel(dobButton, { exact: false }).first().click();
        // check result
        const result = futureDate.toLocaleDateString();
        await expect(calendarPage.dateResult).toHaveText(`Selected date: ${result}`);
    });

    test('Single calendar - Should select a date and display it for prev month', async ({page}) => {
        await expect(calendarPage.singleCalendar).toBeVisible();
        // Today - 30 days
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() - 30);
        const day = futureDate.getDate();
        // Select previous month date
        await calendarPage.singleCalendayPrevMonth.click();
        // Select date
        const dobButton = formatDate(futureDate);
        await calendarPage.singleCalendar.getByLabel(dobButton, { exact: false }).first().click();
        // check result
        const result = futureDate.toLocaleDateString();
        await expect(calendarPage.dateResult).toHaveText(`Selected date: ${result}`);
    });

        test('Single calendar - Should select a date and display it for next month', async ({page}) => {
        await expect(calendarPage.singleCalendar).toBeVisible();
        // Today + 30 days
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 30);
        const day = futureDate.getDate();
        // Select previous month date
        await calendarPage.singleCalendarNextMonth.click();
        // Select date
        const dobButton = formatDate(futureDate);
        await calendarPage.singleCalendar.getByLabel(dobButton, { exact: false }).click();
        // check result
        const result = futureDate.toLocaleDateString();
        await expect(calendarPage.dateResult).toHaveText(`Selected date: ${result}`);
    });

    test('Date of birth - Should select a date of birth and display it', async ({page}) => {
        await expect(calendarPage.dobCalendar).toBeVisible();
        // Today - 20 years
        const today = new Date();
        const dob = new Date(today);
        dob.setFullYear(today.getFullYear() - 20);
        const day = dob.getDate();
        // Select date of birth
        await calendarPage.dobCalendarMonth.selectOption({ value: (dob.getMonth()).toString() });
        await calendarPage.dobCalendarYear.selectOption({ value: dob.getFullYear().toString() });
        // Create a date object for the selected day
        const dobButton = formatDate(dob);
        await calendarPage.dobCalendar.getByLabel(dobButton, { exact: false }).first().click();
        // check result
        const result = dob.toLocaleDateString();
        await expect(calendarPage.dobResult).toHaveText(`Date of birth: ${result}`);
    });

        test('Date of birth - Should not be able to select future date', async ({page}) => {
        await expect(calendarPage.dobCalendar).toBeVisible();
        // Today + 1 day
        const today = new Date();
        const dob = new Date(today);
        dob.setDate(today.getDate() + 1);
        const day = dob.getDate();
        // Select date of birth
        await calendarPage.dobCalendarMonth.selectOption({ value: (dob.getMonth() ).toString() });
        await calendarPage.dobCalendarYear.selectOption({ value: dob.getFullYear().toString() });
        // Create a date object for the selected day
        const dobButton = formatDate(dob);
        await expect(calendarPage.dobCalendar.getByLabel(dobButton, { exact: false }).first()).toBeVisible();
        await expect(calendarPage.dobCalendar.getByLabel(dobButton, { exact: false }).first()).toBeDisabled();
    });

    test('Date range calendar - Should select a date range and display it', async ({page}) => {
        await expect(calendarPage.dateRangeCalendar).toBeVisible();
        // Today + 3 days
        const today = new Date();
        const fromDate = new Date(today);
        fromDate.setDate(today.getDate() + 1);
        const toDate = new Date(today);
        toDate.setDate(today.getDate() + 3);
        // scroll into view
        await calendarPage.dateRangeCalendar.scrollIntoViewIfNeeded();
        // Select from date
        const fromButton = formatDate(fromDate);
        await calendarPage.dateRangeCalendar.getByLabel(fromButton, { exact: false }).first().click();
        // Select to date 
        const toButton = formatDate(toDate);
        await calendarPage.dateRangeCalendar.getByLabel(toButton, { exact: false }).first().click();
        // check result
        const result = `From: ${fromDate.toLocaleDateString()}To: ${toDate.toLocaleDateString()}`;
        await expect(calendarPage.dateRangeResult).toHaveText(result);
    });
       

    test('Date range calendar - Should select a date range and display it for next month', async ({page}) => {
        await expect(calendarPage.dateRangeCalendar).toBeVisible();
        // Today + 30 days
        const today = new Date();
        const fromDate = new Date(today);
        fromDate.setDate(today.getDate() + 30);
        const toDate = new Date(today);
        toDate.setDate(today.getDate() + 33);
        // scroll into view
        await calendarPage.dateRangeCalendar.scrollIntoViewIfNeeded();
        // Select date range
        // If not on correct month select next month
        const currentMonth = await calendarPage.dateRangeCalendar.getByRole('status').innerText();
        if( currentMonth !== fromDate.toLocaleString('default', { month: 'long', year: 'numeric' })) {
            await calendarPage.dateRangeCalendarNextMonth.click();
        }
        // Select from date
        const fromButton = formatDate(fromDate);
        await calendarPage.dateRangeCalendar.getByLabel(fromButton, { exact: false }).first().click();
        // If not on correct month select next month
        const nextMonth = await calendarPage.dateRangeCalendar.getByRole('status').innerText();
        if( nextMonth !== toDate.toLocaleString('default', { month: 'long', year: 'numeric' })) {
            await calendarPage.dateRangeCalendarNextMonth.click();
        }
        // Select to date
        const toButton = formatDate(toDate);
        await calendarPage.dateRangeCalendar.getByLabel(toButton, { exact: false }).first().click();
        // check result
        const result = `From: ${fromDate.toLocaleDateString()}To: ${toDate.toLocaleDateString()}`;
        await expect(calendarPage.dateRangeResult).toHaveText(result);
    });

    test('Input date - Should select a date and display it', async ({page}) => {
        await expect(calendarPage.inputDate).toBeVisible();
        // Today + 2 days
        const today = new Date();
        const inputDate = new Date(today);
        inputDate.setDate(today.getDate() + 2);
        // Scroll into view
        await calendarPage.inputDate.scrollIntoViewIfNeeded();        
        // Select date calendar icon
        await calendarPage.inputDate.scrollIntoViewIfNeeded();
        await calendarPage.inputDateCalendarIcon.click();
        // Select date
        const inputDateButton = formatDate(inputDate);
        await calendarPage.inputDateCalendar.getByLabel(inputDateButton, { exact: false }).first().click();
        
        // check result
        const result = inputDate.toLocaleDateString();
        await expect(calendarPage.inputDate).toHaveValue(inputDate.toLocaleDateString());
        
    });

    test('Button calendar - Should select a date and display it', async ({page}) => {
        await expect(calendarPage.buttonCalendarButton).toBeVisible();
        // Today + 2 days
        const today = new Date();
        const buttonDate = new Date(today);
        buttonDate.setDate(today.getDate() + 2);
        // Scroll into view
        await calendarPage.buttonCalendarButton.scrollIntoViewIfNeeded();        
        // Select date calendar icon
        await calendarPage.buttonCalendarButton.click();
        // Select date
        const date = formatDate(buttonDate);
        await calendarPage.buttonCalendar.getByLabel(date, { exact: false }).first().click();
        
        // Check result
        const result = buttonDate.toLocaleDateString();
        await expect(calendarPage.buttonCalendarButton).toHaveText(`${result}`);
    });

}); 
