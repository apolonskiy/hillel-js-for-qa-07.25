// // @ts-check
import { test, expect } from '@playwright/test';
import { Header, LandingPage, NavBar, SettingsPage } from '../../poms';

test.describe('POM-based tests of Settings page', () => {
  let landingPage;
  let loginModal;
  let header;
  /**
   * @type {NavBar}
   */
  let navBar;
  /**
   * @type {SettingsPage}
   */
  let settingsPage;

  test.beforeEach(async({ page, context }) => {
    console.log('PROCESS ENV TEST1', process.env.SHOW_VALUE);
    landingPage = new LandingPage(page, context);
    header = new Header(page, context);
    navBar = new NavBar(page, context);
    settingsPage = new SettingsPage(page, context);
    await landingPage.open();
    loginModal = await landingPage.clickSignIn();
    await loginModal.executeLogin(process.env.DEFAULT_USERNAME, process.env.DEFAULT_PASSWORD);
    await page.request.put('/api/users/settings', { data: {
      currency: 'usd' }
    });
    await page.request.put('/api/users/settings', { data: {
      distanceUnits: 'km' }
    });

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

  test('Settings update check ABCDDDFDF', { tag: ['@default', '@smoke'] },async({ page }) => {
    await test.step('Initial components check', async() => {
      await header.isHeaderVisible();
      await header.selectTab('expenses');
      await expect(page.locator('h1', { hasText: 'Fuel expenses' })).toBeVisible();
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


  test('Update settings check', { tag: '@settings' }, async({ page }) => {
    await test.step('Initial components check', async() => {
      await header.isHeaderVisible();
      await header.selectTab('expenses');
      await expect(page.locator('h1', { hasText: 'Fuel expenses' })).toBeVisible();
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


  test('FAKE test', { tag: '@default' }, async({ page }) => {
    await test.step('Initial components check', async() => {
      await header.isHeaderVisible();
      await header.selectTab('expenses');
      await expect(page.locator('h1', { hasText: 'Fuel expenses' })).toBeVisible();
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
