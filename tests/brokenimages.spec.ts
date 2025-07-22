import { test, expect } from '@playwright/test';
import { BrokenLinksPage } from './pom/brokenLinks';


test.describe('Broken Images and Links Tests', () => {
    let brokenLinksPage: BrokenLinksPage;


test.skip('Broken images - Check for all downloads 1', async ({ page }) => {
  // Use the router to intercept all requests and check for status codes
  // This would be the preferred method has it capture the urls the fails
  // However I don't want the test to fail if there are 2 broken links ahs that is success for me
  await page.route('/**/*', async (route) => {
    const response = await route.fetch({
        timeout: 5000 // Set a timeout for the request
    });
    expect.soft(response.status(), `Download at ${route.request().url()} is broken.`).toBeLessThan(400);
    route.continue();
  });
  await page.goto('public/broken-links');
  await Promise.all([
      page.waitForLoadState('domcontentloaded', {timeout:30000}),
      page.waitForLoadState('load', {timeout:30000}),
      page.waitForLoadState('networkidle', {timeout:30000})
    ])
  // Expecting 2 broken images as per the test case description
  expect(test.info().errors.length).toBe(2); 

});

test('Broken images - Check for all downloads', async ({ page }) => {
    brokenLinksPage = new BrokenLinksPage(page);
        
    // Set error count var
    var errorCount = 0;
    // Use the router to intercept all requests and check for status codes
    
    await page.route('/**/*', async (route) => {
      const response = await route.fetch({
          timeout: 60000 // Set a timeout for the request
      });
      if(response.status() >= 400) {
        errorCount++;
      }
      route.continue();
    });
    await page.goto('public/broken-links');
    // Wait for page to load
    await Promise.all([
      page.waitForLoadState('domcontentloaded', {timeout:30000}),
      page.waitForLoadState('load', {timeout:30000}),
      page.waitForLoadState('networkidle', {timeout:30000})
    ])
    // Expecting 2 broken images as per the test case description
    expect(errorCount).toBe(2); 
  
  });

test('Broken link - Check for broken images', async ({ page }) => {
  brokenLinksPage = new BrokenLinksPage(page);
  // Initial load of the page  
  await page.goto('public/broken-links');
  // Wait for the page to load completely
  await expect(brokenLinksPage.challenge).toBeVisible();
  await expect(brokenLinksPage.footer).toBeVisible();
  
  // Fixed wait time - webkit and mobile safari browser don't appear to honour the waitForLoadState
  await page.waitForTimeout(3000)
  await Promise.all([
      page.waitForLoadState('domcontentloaded', {timeout:30000}),
      page.waitForLoadState('load', {timeout:30000}),
      page.waitForLoadState('networkidle', {timeout:30000})
    ])

  // set var for error count
  var errorCount = 0;

  // Elements
  const images = page.locator('img');
  // Loop through each image and check if it is broken
  const imageCount = await images.count();
  for (let i = 0; i < imageCount; i++) {
    const img = images.nth(i);
    const src = await img.getAttribute('src');
    if(src){
        const response = await page.request.get(src, {
          timeout: 30000, // Set a timeout for the request
          ignoreHTTPSErrors: true
        });
        // Check if the response status is less than 400 (indicating a valid image)
        if(response.status() >= 400) {
          errorCount++;
        }
        
    }

  }
  console.log(`Total images checked: ${imageCount}`);
  console.log(`Total errors found: ${errorCount}`);
  // Expecting 2 broken images as per the test case description
  expect(errorCount).toBe(2); 
});
});