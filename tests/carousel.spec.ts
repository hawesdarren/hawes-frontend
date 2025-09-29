import { test, expect } from '@playwright/test';
import { CarouselPage } from './pom/carousel';

test.describe('Carousel Tests', () => {
    let carouselPage: CarouselPage;

test.beforeEach(async ({ page }) => {
    carouselPage = new CarouselPage(page);
    await page.goto('/public/carousel');
    // Expect page title to be Carousel
    await expect(carouselPage.heading).toBeVisible();
    // Expect Challenge to be visible
    await expect(carouselPage.challenge).toBeVisible();
    // Expect Carousels to be visible
    await expect(carouselPage.horizontalCarousel).toBeVisible();
    await expect(carouselPage.horizontalCarouselMulti).toBeVisible();
    await expect(carouselPage.verticalCarousel).toBeVisible();
});

test('Carousel page elements visible', async ({ page }) => {
    
  // Expect Horizontal carousel to be visible
  await expect(carouselPage.horizontalCarousel).toBeVisible();
  // Expect Horizontal carousel with multiple visible elements to be visible
  await expect(carouselPage.horizontalCarouselMulti).toBeVisible();
  // Expect Vertical carousel to be visible
  await expect(carouselPage.verticalCarousel).toBeVisible();
});

test('Horizontal carousel - select item by clicking', async ({ page }) => {
    // Click on the 3rd item
    await carouselPage.horizontalItems.nth(2).click();
    // Check if the 3rd item is selected
    await expect(carouselPage.horizontalSelectedItem.getByRole('heading')).toHaveText('Item 3');
    await expect(carouselPage.horizontalSelectedItem).toContainText('Item 3')
    // Check if the result text is updated
    await expect(carouselPage.horizontalResult).toHaveText('Selected item: 3');
    // Check if the item is in view
    await expect(carouselPage.horizontalItems.nth(2)).toBeInViewport();
    // Check that only one item is selected
    await expect(carouselPage.horizontalSelectedItem).toHaveCount(1);
    // check that the selected items color is different from the other items
    const selectedColor = await carouselPage.horizontalSelectedItem.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
    });
    const nonSelectedColor = await carouselPage.horizontalItems.nth(0).evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
    });
    expect(selectedColor).not.toBe(nonSelectedColor);

});

test('Horizontal carousel - select item by keyboard navigation', async ({ page }) => {
    await carouselPage.horizontalItems.nth(0).isVisible();
    // Focus on the first item
    await carouselPage.horizontalItems.nth(0).focus();
    // Press Tab to navigate to the next item
    await page.keyboard.press('Tab');
    // Item 2 should be focused
    await expect(carouselPage.horizontalItems.nth(1)).toBeInViewport({timeout: 2000});
    // Press Tab to navigate to the next item
    await page.keyboard.press('Tab');
    // Item 3 should be focused
    await expect(carouselPage.horizontalItems.nth(2)).toBeInViewport({timeout: 2000});
    // Press Enter to select the item
    await page.keyboard.press('Enter');
    // Check if the 3rd item is selected
    await expect(carouselPage.horizontalSelectedItem.getByRole('heading')).toHaveText('Item 3');
    // Check if the result text is updated
    await expect(carouselPage.horizontalResult).toHaveText('Selected item: 3');
    // Check if the item is in view
    await expect(carouselPage.horizontalItems.nth(2)).toBeInViewport();
    // Check that only one item is selected
    await expect(carouselPage.horizontalSelectedItem).toHaveCount(1);
});

test('Horizontal carousel - use navigation buttons to navigate', async ({ page }) => {
    // Check Nav buttons hidden if viewport < 600px
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 600) {
        await expect(carouselPage.horizontalNextButton).toBeHidden();
        await expect(carouselPage.horizontalPrevButton).toBeHidden();
        return;
    }
    // The first item should be in view
    await expect(carouselPage.horizontalItems.nth(0)).toBeInViewport();
    
    // Click the next button
    await carouselPage.horizontalNextButton.click();
    // The second item should be in view
    await expect(carouselPage.horizontalItems.nth(1)).toBeInViewport();
    // Click the next button
    await carouselPage.horizontalNextButton.click();
    // The third item should be in view
    await expect(carouselPage.horizontalItems.nth(2)).toBeInViewport();
    // Click the previous button
    await carouselPage.horizontalPrevButton.click();
    // The second item should be in view
    await expect(carouselPage.horizontalItems.nth(1)).toBeInViewport();     

});

test('Horizontal carousel - use swipes to navigate', async ({ page }) => {
    const box = await carouselPage.horizontalCarousel.boundingBox();
    if (box) {
        const startX = box.x + box.width - 30;
        const startY = box.y + box.height / 2;
        const endX = box.x + 30;
        const endY = startY;
        // Swipe left to go to the next item
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(endX, endY, { steps: 10 });
        await page.mouse.up();
        // The second item should be in view
        await expect(carouselPage.horizontalItems.nth(1)).toBeInViewport();
        // Swipe left to go to the next item
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(endX, endY, { steps: 10 });
        await page.mouse.up();
        // The third item should be in view
        await expect(carouselPage.horizontalItems.nth(2)).toBeInViewport();
        // Swipe right to go to the previous item
        await page.mouse.move(endX, endY);
        await page.mouse.down();
        await page.mouse.move(startX, startY, { steps: 10 });
        await page.mouse.up();
        // The second item should be in view
        await expect(carouselPage.horizontalItems.nth(1)).toBeInViewport();     
    }
});

test('Horizontal carousel multi - select item by clicking', async ({ page }) => {
        await carouselPage.horizontalItemsMulti.nth(0).click();
        // Click the 3rd item
        await carouselPage.horizontalItemsMulti.nth(2).click();
        
        await expect(carouselPage.horizontalItemsMulti.nth(2)).toHaveAttribute('aria-selected', 'true');
        // Check if the 3rd item is selected
        await expect(carouselPage.horizontalSelectedItemMulti.getByRole('heading')).toHaveText('Item 3');
        await expect(carouselPage.horizontalSelectedItemMulti).toContainText('Item 3');
        await expect(carouselPage.horizontalResultMulti).toHaveText('Selected item: 3');
        await expect(carouselPage.horizontalItemsMulti.nth(2)).toBeInViewport();
        await expect(carouselPage.horizontalSelectedItemMulti).toHaveCount(1);
        // check that the selected items color is different from the other items
        const selectedColor = await carouselPage.horizontalSelectedItemMulti.evaluate((el) => {
            return window.getComputedStyle(el).backgroundColor;
        });
        const nonSelectedColor = await carouselPage.horizontalItemsMulti.nth(0).evaluate((el) => {
            return window.getComputedStyle(el).backgroundColor;
        });
        expect(selectedColor).not.toBe(nonSelectedColor);
    });

 test('Horizontal carousel multi - select item by keyboard navigation', async ({ page }) => {
        await carouselPage.horizontalItemsMulti.nth(0).isVisible();
        await carouselPage.horizontalItemsMulti.nth(0).focus();
        // Select Tab
        await page.keyboard.press('Tab');
        await expect(carouselPage.horizontalItemsMulti.nth(1)).toBeInViewport({timeout: 2000});
        // Slect Tab
        await page.keyboard.press('Tab');
        await expect(carouselPage.horizontalItemsMulti.nth(2)).toBeInViewport({timeout: 2000});
        // Select Enter to select the item
        await page.keyboard.press('Enter');
        // Check Item selected
        await expect(carouselPage.horizontalSelectedItemMulti.getByRole('heading')).toHaveText('Item 3');
        await expect(carouselPage.horizontalResultMulti).toHaveText('Selected item: 3');
        await expect(carouselPage.horizontalItemsMulti.nth(2)).toBeInViewport();
        await expect(carouselPage.horizontalSelectedItemMulti).toHaveCount(1);
    });

test('Horizontal carousel multi - use navigation buttons to navigate', async ({ page }) => {
        const viewport = page.viewportSize();
        if (viewport && viewport.width < 600) {
            await expect(carouselPage.horizontalNextButtonMulti).toBeHidden();
            await expect(carouselPage.horizontalPrevButtonMulti).toBeHidden();
            return;
        }
        await expect(carouselPage.horizontalItemsMulti.nth(0)).toBeInViewport();
        await carouselPage.horizontalNextButtonMulti.click();
        await expect(carouselPage.horizontalItemsMulti.nth(1)).toBeInViewport();
        await carouselPage.horizontalNextButtonMulti.click();
        await expect(carouselPage.horizontalItemsMulti.nth(2)).toBeInViewport();
        await carouselPage.horizontalPrevButtonMulti.click();
        await expect(carouselPage.horizontalItemsMulti.nth(1)).toBeInViewport();
    });

test('Horizontal carousel multi - use swipes to navigate', async ({ page }) => {
        const box = await carouselPage.horizontalCarouselMulti.boundingBox();
        if (box) {
            const itemCount = await carouselPage.horizontalItemsMulti.count();
            const maxSwipes = itemCount * 2; // Prevent infinite loop
            const startX = box.x + box.width - 30;
            const startY = box.y + box.height / 2;
            const endX = box.x + 30;
            const endY = startY;
            // Loop through each item and swipe until it is in view
            for (let i = 1; i < itemCount; i++) {
                let found = false;
                for (let swipes = 0; swipes < maxSwipes; swipes++) {
                    
                    await page.mouse.move(startX, startY);
                    await page.mouse.down();
                    await page.mouse.move(endX, endY, { steps: 10 });
                    await page.mouse.up();
                    
                    // Check if the item is in view
                    if (await carouselPage.horizontalItemsMulti.nth(i).isVisible()) {
                        found = true;
                        break;
                    }
                    
                }
                expect(found).toBe(true);
            }
            // Optionally, swipe back to the first item
            for (let i = itemCount - 2; i >= 0; i--) {
                let found = false;
                for (let swipes = 0; swipes < maxSwipes; swipes++) {
                    await page.mouse.move(endX, endY);
                    await page.mouse.down();
                    await page.mouse.move(startX, startY, { steps: 10 });
                    await page.mouse.up();
                    if (await carouselPage.horizontalItemsMulti.nth(i).isVisible()) {
                        found = true;
                        break;
                    }
                }
                expect(found).toBe(true);
            }
        }
    });

    
test('Vertical carousel - select item by clicking', async ({ page }) => {
    // Scroll the vertical carousel into view
    await carouselPage.verticalCarousel.scrollIntoViewIfNeeded();
    // Click on the 3rd item
    await carouselPage.verticalItems.nth(2).click();
    await expect (carouselPage.verticalItems.nth(2)).toHaveAttribute('aria-selected', 'true', { timeout: 5000 });
    // Check if the 3rd item is selected
    await expect(carouselPage.verticalSelectedItem.getByRole('heading')).toHaveText('Item 3');
    await expect(carouselPage.verticalSelectedItem).toContainText('Item 3')
    // Check if the result text is updated
    await expect(carouselPage.verticalResult).toHaveText('Selected item: 3');
    // Check if the item is in view
    await expect(carouselPage.verticalItems.nth(2)).toBeInViewport();
    // Check that only one item is selected
    await expect(carouselPage.verticalSelectedItem).toHaveCount(1);
    // check that the selected items color is different from the other items
    const selectedColor = await carouselPage.verticalSelectedItem.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
    });
    const nonSelectedColor = await carouselPage.verticalItems.nth(0).evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
    });
    expect(selectedColor).not.toBe(nonSelectedColor);
});

test('Vertical carousel - select item by keyboard navigation', async ({ page }) => {
    await carouselPage.verticalItems.nth(0).isVisible();
    await carouselPage.verticalItems.nth(0).focus();
    // Select Tab
    await page.keyboard.press('Tab');
    await expect(carouselPage.verticalItems.nth(1)).toBeInViewport({timeout: 2000});
    // Slect Tab
    await page.keyboard.press('Tab');
    await expect(carouselPage.verticalItems.nth(2)).toBeInViewport({timeout: 2000});
    // Select Enter to select the item
    await page.keyboard.press('Enter');
    // Check Item selected
    await expect(carouselPage.verticalSelectedItem.getByRole('heading')).toHaveText('Item 3');
    await expect(carouselPage.verticalResult).toHaveText('Selected item: 3');
    await expect(carouselPage.verticalItems.nth(2)).toBeInViewport();
    await expect(carouselPage.verticalSelectedItem).toHaveCount(1);
    await expect(carouselPage.verticalItems.nth(2)).toHaveAttribute('aria-selected', 'true', { timeout: 5000 });   
});

test('Vertical carousel - use navigation buttons to navigate', async ({ page }) => {
    // Scroll the vertical carousel into view
    await carouselPage.verticalCarousel.scrollIntoViewIfNeeded();
    // Check Nav buttons hidden if viewport < 600px
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 600) {
        await expect(carouselPage.verticalNextButton).toBeHidden();
        await expect(carouselPage.verticalPrevButton).toBeHidden();
        return;
    }
    await expect(carouselPage.verticalItems.nth(0)).toBeInViewport();
    await carouselPage.verticalNextButton.click();
    await expect(carouselPage.verticalItems.nth(1)).toBeInViewport();
    await carouselPage.verticalNextButton.click();
    await expect(carouselPage.verticalItems.nth(2)).toBeInViewport();
    await carouselPage.verticalPrevButton.click();
    await expect(carouselPage.verticalItems.nth(1)).toBeInViewport();
    await carouselPage.verticalPrevButton.click();
    await expect(carouselPage.verticalItems.nth(0)).toBeInViewport();
});

test('Vertical carousel - use swipes to navigate', async ({ page }) => {
    // Scroll the vertical carousel into view
    await carouselPage.verticalCarousel.scrollIntoViewIfNeeded();
    
    const box = await carouselPage.verticalCarousel.boundingBox();
    if (box) {
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height - 30;
        const endX = startX;
        const endY = box.y + 30;
        // Swipe up to go to the next item
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(endX, endY, { steps: 10 });
        await page.mouse.up();
        // The second item should be in view
        await expect(carouselPage.verticalItems.nth(1)).toBeInViewport();
        // Swipe up to go to the next item
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(endX, endY, { steps: 10 });
        await page.mouse.up();
        // The third item should be in view
        await expect(carouselPage.verticalItems.nth(2)).toBeInViewport();
        // Swipe down to go to the previous item
        await page.mouse.move(endX, endY);
        await page.mouse.down();
        await page.mouse.move(startX, startY, { steps: 10 });
        await page.mouse.up();
        // The second item should be in view
        await expect(carouselPage.verticalItems.nth(1)).toBeInViewport();     
    }
});
});