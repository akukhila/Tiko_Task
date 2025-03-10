import { Locator, Page, expect } from '@playwright/test';

export class PostalCodeSearch {
    readonly page: Page;
    readonly searchButton: Locator;
    readonly errorMessage: Locator;
    readonly searchReasultsBox: Locator;



    constructor(page: Page) {
        this.page
        this.page = page;
        this.searchButton = page.locator('#buttonPostalCodeSearch');
        this.errorMessage = page.locator('#localidade-error');
        this.searchReasultsBox = page.locator('#postalCodeSearchResult');

    }

    async clickSearchButton() {
        await this.searchButton.click();
        this.page.waitForLoadState('domcontentloaded');
    }

    async cHeckEmptyDataSearch(errorMessage: string) {
        await expect(this.errorMessage).toHaveText(errorMessage);
        await expect(this.searchReasultsBox).toHaveCount(0);
    }
}