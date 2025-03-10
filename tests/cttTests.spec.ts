import { test } from '../fixtures'

const emptyFieldsError = 'Locality criteria required. Instead select District and Region.';

test.beforeEach(async ({ page }) => {
    await page.goto('?request_locale=en');
    page.waitForLoadState('load');
    const acceptCookies = page.locator('#onetrust-accept-btn-handler');
    await acceptCookies.click();
})

test('Find the postcode_ all fields empty', async ({ pageManager }) => {
    await pageManager.postalCodeSearch.clickSearchButton();
    await pageManager.postalCodeSearch.cHeckEmptyDataSearch(emptyFieldsError);
});