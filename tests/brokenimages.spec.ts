import { test, expect } from '@playwright/test';
import { time } from 'console';

test.skip('Broken images - Check for all downloads', async ({ page }) => {

  // Elements
  const images = page.locator('img');
  
  // Loop through each image and check if it is broken
  const imageCount = await images.count();
  await page.route('/**/*', async (route) => {
    const response = await route.fetch({
        timeout: 5000 // Set a timeout for the request
    });
    expect.soft(response.status(), `Image at ${route.request().url()} is broken.`).toBeLessThan(400);
    route.continue();
  });
  await page.goto('public/broken-links');
  await page.waitForLoadState('networkidle');
  // Expecting 2 broken images as per the test case description
  expect(test.info().errors.length).toBe(2); 

});

test('Broken images - Check for all downloads', async ({ page }) => {

    // Elements
    const images = page.locator('img');
    // Set error count var
    var errorCount = 0;
    // Loop through each image and check if it is broken
    const imageCount = await images.count();
    await page.route('/**/*', async (route) => {
      const response = await route.fetch({
          timeout: 5000 // Set a timeout for the request
      });
      if(response.status() >= 400) {
        errorCount++;
      }
      route.continue();
    });
    await page.goto('public/broken-links');
    await page.waitForLoadState('networkidle');
    // Expecting 2 broken images as per the test case description
    expect(errorCount).toBe(2); 
  
  });

test('Broken link - Check for broken images', async ({ page }) => {
  // Initial load of the page  
  await page.goto('public/broken-links');
  // Wait for the page to load completely
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('The challenge is to find all of the broken links and images in this page')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Images' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Todo - downloads' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Todo - internal and external links' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Checkbox' })).toBeVisible();

  // v set var for error count
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
          timeout: 5000 // Set a timeout for the request
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