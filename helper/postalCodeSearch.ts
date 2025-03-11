import { Locator, Page, expect } from '@playwright/test';

export class PostalCodeSearch {
    readonly page: Page;
    readonly searchButton: Locator;
    readonly localityError: Locator;
    readonly searchReasultsBox: Locator;
    readonly actionError: Locator;
    readonly searchResult: Locator;


    constructor(page: Page) {
        this.page = page;
        this.searchButton = page.locator('#buttonPostalCodeSearch');
        this.localityError = page.locator('#localidade-error');
        this.searchReasultsBox = page.locator('#postalCodeSearchResult');
        this.actionError = page.locator('#actionErrors');
        this.searchResult = page.locator('.highlighted-result');

    }


    async acceptCookies() {
        const acceptCookies = this.page.locator('#onetrust-accept-btn-handler');
        await acceptCookies.click();
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async checkEmptyFieldsSearch(errorMessage: string) {
        await expect(this.localityError).toHaveText(errorMessage);
        await expect(this.searchReasultsBox).toHaveCount(0);
    }

    async selectDistrictOption(district: string) {
        const districtDropDown = this.page.locator('#distritos');
        await districtDropDown.selectOption(district);
    }

    async selectRegionOption(region: string) {
        const districtDropDown = this.page.locator('#concelhos');
        await districtDropDown.selectOption(region);
    }

    async checkTooManyResultsError(errorMessage: string) {
        await expect(this.actionError).toHaveText(errorMessage);
        await expect(this.searchReasultsBox).toHaveCount(0);
    }

    async fillLocality(locality: string) {
        const localityField = this.page.locator('#localidade');
        await localityField.fill(locality);
    }

    async fillStreet(street: string) {
        const streetField = this.page.locator('#nomeRua');
        await streetField.fill(street)
    }

    async fillDoor(door: string) {
        const doorField = this.page.locator('#numPorta');
        await doorField.fill(door)
    }

    async checkSingleResult(street: string, locality: string, code: string) {
        await expect(this.page.getByRole('heading', { name: 'Results' })).toBeVisible();
        await expect(this.searchResult).toBeVisible();
        const resultStreet = this.searchResult.locator('h4').first();
        const resultLocality = this.searchResult.locator('h4').last();
        const postCode = this.searchResult.locator('h2');
        await expect(resultStreet).toHaveText(street);
        await expect(resultLocality).toHaveText(locality);
        const postCodeText = `${code} ${locality.toUpperCase()}`
        await expect(postCode).toHaveText(postCodeText);

    }
}