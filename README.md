Hello,

In this file you can find instructions and explanations for the test task.

# Initial installations:

1. Please check that you have all necessary installations: Node.js, Git, IDE (e.g.VS Code).
2. Clone the project from the GitHub repo.
3. To install all dependencies from package.json please execute the command `npm install`.
4. Execute command `npx playwright install` to install all browsers: Chromium, FireFox, Webkit.
5. Install also Playwright extension (Playwright Test for VSCode).

#  Project structure
In the project was implemented a Page Object pattern
There are 2 main folders:

- helper
- tests

Helper folder should contain files and classes for separate application pages. For example, we have **postalCodeSearch.ts** file wich contain only methods related to the actions on the Postal Code page. PageManager class(pageManager.ts file) should contain import of all classes describing each page. Usually the helper folder contains a lot of different classes for pages, so it is useful to create a pageManager and use it in the tests. I also added fixtures.ts file to create an object of the Page Manager class only once and transfer it to the tests.

Tests folder contains one file **FindPostCodeTest.spec.ts** with 4 tests.  Each method in the tests represents the step described in the Test Cases. In the last test  **05_Find the postcode_Find postcode for specific address** I used parameters to be able to reuse this test with another data (e.g. different region, locality etc.).

playwright.config.ts file contain all necessary settings related to the tests and test execution

# Test execution
1. You can use command line for test execution e.g command `npx playwright test`. For more information regarding the commands please check playwright documentation. https://playwright.dev/docs/running-tests

2. Tests could be executed in the UI mode. Use command `npx playwright test --ui`

3. You can also run tests directly in VSCode. e.g. Testing tab or directly in the files with tests

Thank you for reviewing my test task!