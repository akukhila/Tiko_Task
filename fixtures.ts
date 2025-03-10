import { test as base } from '@playwright/test'
import { PageManager } from './helper/pageManager'

export type MyFixtures = {

    pageManager: PageManager


}

export const test = base.extend<MyFixtures>({
    pageManager: async ({ page }, use) => {
        const pm = new PageManager(page);
        await use(pm);
    }
});

module.exports = { test };