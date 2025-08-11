import { test as setup } from '@playwright/test';
import { LandingPage } from '../../poms';

setup('Login with default user', async({ page, context }) => {
  const landingPage = new LandingPage(page, context);
  await landingPage.open();
  const loginModal = await landingPage.clickSignIn();
  await loginModal.executeLogin(process.env.DEFAULT_USERNAME, process.env.DEFAULT_PASSWORD);
  await page.waitForURL('**/panel/garage');
  await page.waitForTimeout(1000); // Wait for the page to stabilize
  await page.context().storageState({ path: '.auth/user.json' });
});