import { Page } from "@playwright/test";
import { PostalCodeSearch } from "./postalCodeSearch";


export class PageManager {
    readonly page: Page;
    readonly postalCodeSearch: PostalCodeSearch
  


    constructor(page: Page) {
        this.page
        this.page = page;
        this.postalCodeSearch = new PostalCodeSearch(this.page)
        
    }
}