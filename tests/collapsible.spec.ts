import { test, expect } from '@playwright/test';
import { CollapsiblePage } from './pom/collapsible';

test.describe('Collapsible Tests', () => {
    let collapsiblePage: CollapsiblePage;

test.beforeEach(async ({ page }) => {
    collapsiblePage = new CollapsiblePage(page);
    await page.goto('/public/collapsible');
    // Expect page title to be Accordion
    await expect(collapsiblePage.heading).toBeVisible();
    // Expect Challenge to be visible
    await expect(collapsiblePage.challenge).toBeVisible();
});

test('Collapsible page elements visible', async ({ page }) => {
    
  // Expect Read more... to be visible
  await expect(collapsiblePage.readMore).toBeVisible();
  // Expect Footer to be visible
  await expect(collapsiblePage.footer).toBeVisible(); 
  // Expect content to be hidden
  await expect(collapsiblePage.collapsibleContent).not.toBeVisible();
  // Select Read more... to expand content
  await collapsiblePage.readMore.click();
  // Expect content to be visible
  await expect(collapsiblePage.collapsibleContent).toBeVisible();
  // Select Read less... to collapse content
  await collapsiblePage.readMore.click();
  // Expect content to be hidden
  await expect(collapsiblePage.collapsibleContent).not.toBeVisible();


});



});









