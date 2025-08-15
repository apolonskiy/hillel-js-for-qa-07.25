import { test, expect } from '@playwright/test';
import { LandingPage, GaragePage, Header, NavBar } from '../../poms';

const BRAND = 'BMW';
const MODEL = 'X5';
const MILEAGE = 1555;

// If UI uses different model name adjust MODEL accordingly.

test.describe.skip('Garage add and delete car', () => {
  let landingPage: LandingPage;
  let loginModal: any;
  let garagePage: GaragePage;
  let header: Header;
  let navBar: NavBar;

  test.beforeEach(async({ page, context }) => {
    landingPage = new LandingPage(page, context);
    garagePage = new GaragePage(page, context);
    header = new Header(page, context);
    navBar = new NavBar(page, context);

    await landingPage.open();
    loginModal = await landingPage.clickSignIn();
    await loginModal.executeLogin(process.env.DEFAULT_USERNAME as string, process.env.DEFAULT_PASSWORD as string);
    await page.waitForURL('**/panel/garage');
  });

  test.afterEach(async() => {
    await garagePage.deleteCar(BRAND, MODEL);
  });

  test('Add BMW X5 with mileage then delete it', async({ page }) => {
    await test.step('Add car', async() => {
      await garagePage.addCar(BRAND, MODEL, MILEAGE);
      await expect(page.locator('.car_name', { hasText: `${BRAND} ${MODEL}` })).toBeVisible();
    });

    await test.step('Delete car (explicit)', async() => {
      await garagePage.deleteCar(BRAND, MODEL);
      await expect(page.locator('.car_name', { hasText: `${BRAND} ${MODEL}` })).toHaveCount(0);
    });
  });
});
