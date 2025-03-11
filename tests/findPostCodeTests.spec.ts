import { test } from '../fixtures'

const emptyFieldsError = 'Locality criteria required. Instead select District and Region.';
const tooManyResultsError = 'Too many results were found. Please type more of the address to refine your results.';
const missingLocalityError = 'Locality criteria required. Instead select District and Region.';

test.beforeEach(async ({ page, pageManager }) => {
    await page.goto('?request_locale=en');
    page.waitForLoadState('load');
    await pageManager.postalCodeSearch.acceptCookies()
})

test('01_Find the postcode_ all fields empty', async ({ pageManager }) => {
    await pageManager.postalCodeSearch.clickSearchButton();
    await pageManager.postalCodeSearch.checkEmptyFieldsSearch(emptyFieldsError);
});

test('02_Find the postcode_ Select search criteria with big amount of results', async ({ pageManager }) => {
    await pageManager.postalCodeSearch.selectDistrictOption('Braga');
    await pageManager.postalCodeSearch.selectRegionOption('Braga');
    await pageManager.postalCodeSearch.clickSearchButton();
    await pageManager.postalCodeSearch.checkTooManyResultsError(tooManyResultsError);

});

test('03_Find the postcode_Fill only District field', async ({ pageManager }) => {
    await pageManager.postalCodeSearch.selectDistrictOption('Braga');
    await pageManager.postalCodeSearch.clickSearchButton();
    await pageManager.postalCodeSearch.checkEmptyFieldsSearch(missingLocalityError)

});


const testCases = [
    { district: 'Lisboa', region: 'Sintra', locality: 'Colares', street: 'Rua da Abreja', door: '1', code: '2705-178' },
    { district: 'Lisboa', region: 'Torres Vedras', locality: 'Torres Vedras', street: 'Avenida 5 de Outubro', door: '1', code: '2560-270' }

];


testCases.forEach(({ district, region, locality, street, door, code }) => {
    test(`05_Find the postcode_Find postcode for specific address:  ${district}, ${region}`, async ({ pageManager }) => {
        await pageManager.postalCodeSearch.selectDistrictOption(district);
        await pageManager.postalCodeSearch.selectRegionOption(region);
        await pageManager.postalCodeSearch.fillLocality(locality);
        await pageManager.postalCodeSearch.fillStreet(street);
        await pageManager.postalCodeSearch.fillDoor(door);
        await pageManager.postalCodeSearch.clickSearchButton();
        await pageManager.postalCodeSearch.checkSingleResult(street, locality, code)

    });

});