import { test as base } from '@playwright/test';
import { LandingPage } from '../poms';


export const loginTest = base.extend<{ login: void }>({
  login: [async({ page, context }, use) => {
    const landingPage = new LandingPage(page, context);
    await landingPage.open();
    const loginModal = await landingPage.clickSignIn();
    await loginModal.executeLogin(process.env.DEFAULT_USERNAME as string, process.env.DEFAULT_PASSWORD as string);
    await use();
  }, { auto: true }],
});