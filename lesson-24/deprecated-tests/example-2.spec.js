// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Longer test', () => {

  test.beforeEach(async({ page, context, browser, request }) => {
    console.log(page.url());
    console.log('SHOW_THIS_VAR', process.env.SHOW_THIS_VAR);
  });

  test('Click Github', async({ page, context, browser, request }) => {
    const context2 = await browser.newContext();
    await page.goto('https://playwright.dev/');
    let pages = context.pages();
    console.log(pages.length);


    const githubPagePromise = context.waitForEvent('page');
  
    // Click the get started link.
    await page.locator('[class*="navbar"] div[class="theme-layout-navbar-right navbar__items navbar__items--right"] a[aria-label="GitHub repository"]').click();
    const githubPage = await githubPagePromise;

    expect(githubPage.url()).toContain('github.com');
    expect(page.url()).not.toContain('github.com');
    // Expects page to have a heading with the name of Installation.

    await page.waitForTimeout(2000);
    pages = context.pages();
    expect(pages[1].url()).toContain('github.com');
    console.log(pages.length);

    await context.newPage();
    await page.waitForTimeout(2000);

    pages = context.pages();
    console.log(pages.length);
  });
});
