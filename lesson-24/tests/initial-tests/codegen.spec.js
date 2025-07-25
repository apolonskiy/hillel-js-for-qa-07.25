import { test, expect } from '@playwright/test';

test('codegen', async({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('hillel-1@aaa.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('testHillel1!');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('div').filter({ hasText: /^GarageAdd carYou don’t have any cars in your garage$/ }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add car' })).toBeVisible();
  await page.getByRole('link', { name: ' Profile' }).click();
  await expect(page.locator('app-profile')).toContainText('aaa bbb');
});