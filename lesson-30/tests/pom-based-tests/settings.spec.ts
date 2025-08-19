// // @ts-check
import { test, expect } from '@playwright/test';
import { Header, LandingPage, NavBar, SettingsPage } from '../../poms';

test.describe('POM-based tests of Settings page', () => {
  let landingPage;
  let loginModal;
  let header: Header;
  let navBar: NavBar;
  let settingsPage: SettingsPage;

  test.beforeEach(async({ page, context, baseURL }) => {
    landingPage = new LandingPage(page, context);
    header = new Header(page, context);
    navBar = new NavBar(page, context);
    settingsPage = new SettingsPage(page, context);
    await landingPage.open();
    // ---------
    // Set up anything in Browser Console via EVALUATE
    // const existingSession = 'sid=s%3ADmbeKPnTHchBSWFGY4RuE_q7r7y6CqNd.KnbKgMf%2BJIcNuPfmrTdE%2Bq2cQLm5y7HmGnuIthLifqs';
    // await page.evaluate((session) => {
    //   document.cookie = session;
    //   console.log('COOKIE VALUE', document.cookie);
    //   return document.cookie;
    // }, existingSession);

    //---------

    // Setup cookies via PW method on context
    // await context.addCookies([{
    //   name: existingSession.split('=')[0],
    //   value: existingSession.split('=')[1],
    //   url: baseURL
    // }]);
    // await page.pause();

    // --------
    loginModal = await landingPage.clickSignIn();
    await loginModal.executeLogin(process.env.DEFAULT_USERNAME!, process.env.DEFAULT_PASSWORD!);
    await page.request.put('/api/users/settings', { data: {
      currency: 'usd' }
    });
    await page.request.put('/api/users/settings', { data: {
      distanceUnits: 'km' }
    });
    // const cookieValue = await page.evaluate(() => {
    //   console.log(document.cookie);
    //   return document.cookie;
    // });
    // console.log('COOKIE VALUE', cookieValue);
    // await page.pause()
    await page.reload();
  });


  test.afterEach(async({ page }) => {

    await page.request.put('/api/users/settings', { data: {
      currency: 'usd' }
    });

    await page.request.put('/api/users/settings', { data: {
      distanceUnits: 'km' }
    });
  });

  test('Settings update check', { tag: ['@default', '@smoke'] },async({ page }) => {
    await test.step('Initial components check', async() => {
      await header.isHeaderVisible();
      await header.selectTab('expenses');
      await expect(page.locator('h1', { hasText: 'Fuel expenses'   })).toBeVisible();
      await navBar.selectTab('settings');
      await page.reload();
    });

    await test.step('Settings page checks', async() => {
      await settingsPage.isCurrencySelected('USD');
      await settingsPage.isUnitsSelected('km');

      await settingsPage.selectCurrency('EUR');
      await settingsPage.selectUnits('ml');

      await page.reload();
      await settingsPage.isCurrencySelected('EUR');
      await settingsPage.isUnitsSelected('ml');

      await settingsPage.clickChangeEmail();
      await settingsPage.isInputValidationErrorVisible('Email required');
      await settingsPage.isInputValidationErrorVisible('Password required');

      await settingsPage.clickChangePassword();

      await settingsPage.isInputValidationErrorVisible('Old password required');
      await settingsPage.isInputValidationErrorVisible('New password required');
      await settingsPage.isInputValidationErrorVisible('Re-enter password required');
    });
 
  });
});
