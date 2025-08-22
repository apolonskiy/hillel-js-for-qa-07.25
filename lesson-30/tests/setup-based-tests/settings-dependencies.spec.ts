import { expect } from '@playwright/test';
import { settingsTestWithouLogin as test } from '../../fixtures';

test.describe('SETUP-based tests of Settings page', () => {

  test('Setup based settings page test', { tag: ['@setup'] },async({ page, settingsPage, header, navBar }) => {
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

  test('Setup based settings page test -1', { tag: ['@setup'] },async({ page, settingsPage, header, navBar }) => {
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

  test('Setup based settings page test -2', { tag: ['@setup'] },async({ page, settingsPage, header, navBar }) => {
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
