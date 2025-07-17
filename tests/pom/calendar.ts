import { Page, Locator } from "@playwright/test";

export class CalendarPage {
    readonly page: Page;
    // Selector for single calendar
    readonly singleCalendar: Locator;
    readonly singleCalendayPrevMonth: Locator;
    readonly singleCalendarNextMonth: Locator;
    readonly dateResult: Locator;
    // selector for date of birth calendar
    readonly dobCalendar: Locator;
    readonly dobCalendarMonth: Locator;
    readonly dobCalendarYear: Locator;
    readonly dobResult: Locator;
    // Selector for date range 
    readonly dateRangeCalendar: Locator;
    readonly dateRangeCalendarPrevMonth: Locator;
    readonly dateRangeCalendarNextMonth: Locator;
    readonly dateRangeResult: Locator;
    // Selector for input date result
    readonly inputDate: Locator;
    readonly inputDateCalendarIcon: Locator;
    readonly inputDateCalendar: Locator;
    // Selector for button calendar
    readonly buttonCalendar: Locator
    readonly buttonCalendarButton: Locator;    



    constructor(page: Page) {
        this.page = page;
        // Selector for the single calendar
        this.singleCalendar = page.getByTestId("singleCalendar");
        this.singleCalendayPrevMonth = this.singleCalendar.getByLabel("Go to the Previous Month", { exact: true });
        this.singleCalendarNextMonth = this.singleCalendar.getByLabel("Go to the Next Month", { exact: true });
        this.dateResult = page.getByTestId("dateResult");
        // Selector for the date of birth calendar
        this.dobCalendar = page.getByTestId("dobCalendar");
        this.dobCalendarMonth = this.dobCalendar.getByLabel("Choose the Month");
        this.dobCalendarYear = this.dobCalendar.getByLabel("Choose the Year");
        this.dobResult = page.getByTestId("dobResult");
        // Selector for the date range calendar
        this.dateRangeCalendar = page.getByTestId("dateRangeCalendar");
        this.dateRangeCalendarPrevMonth = this.dateRangeCalendar.getByLabel("Go to the Previous Month", { exact: true });
        this.dateRangeCalendarNextMonth = this.dateRangeCalendar.getByLabel("Go to the Next Month", { exact: true });
        this.dateRangeResult = page.getByTestId("dateRangeResult");
        // Selector for the input date
        this.inputDate = page.getByTestId("inputDate");
        this.inputDateCalendarIcon = page.getByTestId("openCalendar");
        this.inputDateCalendar = page.getByTestId("inputDateCalendar");

        // Selector for the button calendar
        this.buttonCalendarButton = page.getByTestId("setDateButton");
        this.buttonCalendar = page.getByTestId("buttonDateCalendar");
        
  
    }
}