import { Page, Locator } from "@playwright/test";
import { th } from "date-fns/locale";

export class CarouselPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly challenge: Locator;
    // Horizotonal carousel
    readonly horizontalCarousel: Locator;
    readonly horizontalItems: Locator;
    readonly horizontalPrevButton: Locator;
    readonly horizontalNextButton: Locator;
    readonly horizontalSelectedItem: Locator;
    readonly horizontalResult: Locator;
    // Horizontal multi-item carousel
    readonly horizontalCarouselMulti: Locator;
    readonly horizontalItemsMulti: Locator;
    readonly horizontalPrevButtonMulti: Locator;
    readonly horizontalNextButtonMulti: Locator;
    readonly horizontalSelectedItemMulti: Locator;
    readonly horizontalResultMulti: Locator;
    // Vertical carousel
    readonly verticalCarousel: Locator;
    readonly verticalItems: Locator;
    readonly verticalPrevButton: Locator;
    readonly verticalNextButton: Locator;
    readonly verticalSelectedItem: Locator;
    readonly verticalResult: Locator;

    constructor(page: Page) {
        this.page = page; 
        this.heading = page.getByRole('heading', { name: 'Carousel', level: 1 });
        this.challenge = page.getByTestId('challenge');
        // Selectors for horizontal carousel
        this.horizontalCarousel = page.getByTestId('horizontal-carousel');
        this.horizontalItems = this.horizontalCarousel.locator('.carousel-item');
        this.horizontalPrevButton = this.horizontalCarousel.getByRole('button', { name: 'Previous' });
        this.horizontalNextButton = this.horizontalCarousel.getByRole('button', { name: 'Next' });
        this.horizontalSelectedItem = this.horizontalCarousel.getByRole('option', { selected: true });
        this.horizontalResult = page.getByTestId('horizontalResult');
        // Selectors for horizontal multi-item carousel
        this.horizontalCarouselMulti = page.getByTestId('horizontal-carousel-multi');
        this.horizontalItemsMulti = this.horizontalCarouselMulti.locator('.carousel-item');
        this.horizontalPrevButtonMulti = this.horizontalCarouselMulti.getByRole('button', { name: 'Previous' });
        this.horizontalNextButtonMulti = this.horizontalCarouselMulti.getByRole('button', { name: 'Next' });
        this.horizontalSelectedItemMulti = this.horizontalCarouselMulti.getByRole('option', { selected: true });
        this.horizontalResultMulti = page.getByTestId('horizontalResultMulti');
        // Selectors for vertical carousel
        this.verticalCarousel = page.getByTestId('vertical-carousel');
        this.verticalItems = this.verticalCarousel.locator('.carousel-item');
        this.verticalPrevButton = this.verticalCarousel.getByRole('button', { name: 'Previous' });
        this.verticalNextButton = this.verticalCarousel.getByRole('button', { name: 'Next' });
        this.verticalSelectedItem = this.verticalCarousel.getByRole('option', { selected: true });
        this.verticalResult = page.getByTestId('verticalResult');
        
    }
}