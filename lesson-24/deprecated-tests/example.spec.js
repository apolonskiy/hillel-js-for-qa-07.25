// // @ts-check
import { test, expect } from '@playwright/test';


// test.describe('Describe name', () => {

//   test.beforeAll(async() => {
//     console.log('SHOW_THIS_VAR', process.env.SHOW_THIS_VAR);
//   })

//   test.beforeEach(async() => {
//     console.log('logs before each test');
//   })

test('has title', async({ page }) => {
  await test.step('This is custom Step',async() => {
    await page.goto('https://playwright.dev/');
  });
  
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
  
//   test('get started link', async ({ page }) => {
//     await page.goto('https://playwright.dev/');
  
//     // Click the get started link.
//     await page.getByRole('link', { name: 'Get started' }).click();
  
//     // Expects page to have a heading with the name of Installation.
//     await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
//   });

//   test('get started link 1', async ({ page }) => {
//     await page.goto('https://playwright.dev/');
  
//     // Click the get started link.
//     await page.getByRole('link', { name: 'Get started' }).click();
  
//     // Expects page to have a heading with the name of Installation.
//     await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible({timeout: 10_000});
//   });

//   test('get started link 2', async ({ page }) => {
//     await page.goto('https://playwright.dev/');
  
//     // Click the get started link.
//     await page.getByRole('link', { name: 'Get started' }).click({timeout: 10_000});
  
//     // Expects page to have a heading with the name of Installation.
//     await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
//   });
// })
