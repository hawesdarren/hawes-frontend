import { test, expect } from '@playwright/test';
import { BrokenLinksPage } from './pom/brokenLinks';


test.describe('Broken Images and Links Tests', () => {
    let brokenLinksPage: BrokenLinksPage;


test.skip('Broken images - Check for all downloads - preferred', async ({ page }) => {
  // Use the router to intercept all requests and check for status codes
  // This would be the preferred method has it capture the urls that fails
  // However I don't want the test to fail if there are 2 broken links, that is success for me
  await page.route('/**/*', async (route) => {
    const response = await route.fetch({
        timeout: 30000 // Set a timeout for the request
    });
   
    expect.soft(response.status(), `Download at ${route.request().url()} is broken.`).toBeLessThan(400);
    route.continue();
    
  });
  await page.goto('public/broken-links');
  
  await Promise.all([
      page.waitForLoadState('domcontentloaded', {timeout:30000}),
      page.waitForLoadState('load', {timeout:30000}),
    ])
  // Wait until more than 3 images are rendered
  await page.waitForFunction(() => document.querySelectorAll('img').length > 3, null, { timeout: 10000 });
  // Wait for at least 3 images to be rendered in the DOM
  const imgCount = await page.locator('img').count();
  expect(imgCount).toBeGreaterThan(3);
  await page.unrouteAll({ behavior: 'ignoreErrors' })
  // Expecting 2 broken images as per the test case description
  const errors = test.info().errors;
  console.log(`Total errors found: ${errors.length}`);
  expect(test.info().errors.length).toBe(2);

});

test.skip('Broken images - Check for all downloads', async ({ page }) => {
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
        console.log(`Broken link found: ${route.request().url()} with status ${response.status()}`);
      }
      route.continue();
    });
    await page.goto('public/broken-links');
    // Wait for page to load
    await Promise.all([
      page.waitForLoadState('domcontentloaded', {timeout:30000}),
      page.waitForLoadState('load', {timeout:30000}),
      //page.waitForLoadState('networkidle', {timeout:30000})
    ])
    await page.unrouteAll({ behavior: 'ignoreErrors' })
    // Expect more than three images present on the page
    expect(await page.locator('img').count()).toBeGreaterThan(3);
    // Expecting 2 broken images as per the test case description
    expect(errorCount).toBe(3); 
  
  });

test('Broken link - Check for broken images', async ({ page }) => {
  brokenLinksPage = new BrokenLinksPage(page);
  // Initial load of the page  
  await page.goto('public/broken-links');
  // Fixed wait time - webkit and mobile safari browser don't appear to honour the waitForLoadState
  //await page.waitForTimeout(3000)
  await Promise.all([
      page.waitForLoadState('domcontentloaded', {timeout:30000}),
      page.waitForLoadState('load', {timeout:30000}),
    ])
  // Wait for the page to load completely
  await expect(brokenLinksPage.challenge).toBeVisible();
  await expect(brokenLinksPage.footer).toBeVisible();
  // Wait for the images to be visible - they wont all be visible, so no assertions here
  await page.locator('img').first().waitFor({ state: 'visible', timeout: 30000 });
  await page.locator('img').nth(3).waitFor({ state: 'visible', timeout: 30000 });
  await page.locator('img').nth(4).waitFor({ state: 'visible', timeout: 30000 });
  await page.locator('img').last().waitFor({ state: 'visible', timeout: 30000 });
  
  // set var for error count
  var errorCount = 0;

  // Elements
  const images = page.locator('img');
  //const images = page.getByRole('img'); // Not finding images because they don't have alt text
  // Loop through each image and check if it is broken
  const imageCount = await images.count();
  console.log(`Total images found: ${imageCount}`);
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
          console.log('Broken image found:', src, 'with status', response.status());
        }
        
    }

  }
  
  console.log(`Total errors found: ${errorCount}`);
  // Expecting 2 broken images as per the test case description
  expect(errorCount).toBe(2); 
});

test('Broken link - Check for broken links', async ({ page }) => {
  brokenLinksPage = new BrokenLinksPage(page);
  // Initial load of the page  
  await page.goto('public/broken-links');
  // Fixed wait time - webkit and mobile safari browser don't appear to honour the waitForLoadState
  //await page.waitForTimeout(3000)
  await Promise.all([
      page.waitForLoadState('domcontentloaded', {timeout:30000}),
      page.waitForLoadState('load', {timeout:30000}),
    ])
  // Wait for the page to load completely
  await expect(brokenLinksPage.challenge).toBeVisible();
  await expect(brokenLinksPage.footer).toBeVisible();
  // Wait for the images to be visible - they wont all be visible, so no assertions here
  await page.locator('img').first().waitFor({ state: 'visible', timeout: 30000 });
  await page.locator('img').nth(3).waitFor({ state: 'visible', timeout: 30000 });
  await page.locator('img').nth(4).waitFor({ state: 'visible', timeout: 30000 });
  await page.locator('img').last().waitFor({ state: 'visible', timeout: 30000 });
  
  // set var for error count
  var errorCount = 0;

  // Elements
  const allLinks = page.locator('a')
  // Loop through each link and check if it is broken
  const allLinksCount = await allLinks.count();
  console.log(`Total links found: ${allLinksCount}`);
  for (let i = 0; i < allLinksCount; i++) {
    const link = allLinks.nth(i);
    const href = await link.getAttribute('href');
    if(href!=='mailto:contact@hawes.co.nz' && href!==null) { // Ignore mailto links
        const response = await page.request.get(href, {
          timeout: 30000, // Set a timeout for the request
          ignoreHTTPSErrors: true
        });
        // Check if the response status is less than 400 (indicating a valid image)
        if(response.status() >= 400) {
          errorCount++;
          console.log('Broken link found:', href, 'with status', response.status());
        }
        
    }

  }
  
  console.log(`Total errors found: ${errorCount}`);
  // Expecting 0 broken links as per the test case description
  expect(errorCount).toBe(0); 
});

});