// // @ts-check
import { test, expect, request as apiRequest } from '@playwright/test';
import { Header, LandingPage, NavBar, SettingsPage } from '../../poms';
import { AuthenticationAPI } from '../../api/authentincation.api';
import { SettingsAPI } from '../../api/settings.api';

test.describe('API related tests of Settings page', () => {
  let landingPage;
  let loginModal;
  let header: Header;
  let navBar: NavBar;
  let settingsPage: SettingsPage;

  let settinsApi: SettingsAPI;

  test.beforeEach(async({ page, context, request }) => {
    landingPage = new LandingPage(page, context);
    header = new Header(page, context);
    navBar = new NavBar(page, context);
    settingsPage = new SettingsPage(page, context);
    settinsApi = new SettingsAPI(page.request);
    
    page.on('request', request => {
      if(request.url().includes('api/users/current') && request.method() === 'GET') {
        // console.log(request.headers());
        expect(request.headers().cookie).toContain('sid=');
      }
      // console.log('>>', request.method(), request.url());
    });
    // page.on('response', response => console.log('<<', response.status(), response.url()));
    await landingPage.open();

    loginModal = await landingPage.clickSignIn();

    // Route continue with modified headers
    await page.route('**/api/users/current', async(route, request) => {
      const headers = {
        ...request.headers(),
        'x-custom-header': 'my-custom-value'
      };
      await route.continue({ headers });
    });

    // await page.route('**/api/auth/signin', async(route) => {
    //   await route.fulfill({
    //     status: 400,
    //     contentType: 'application/json',
    //     json: {
    //       message: 'Wrong email or password',
    //       status: 'error'
    //     }
    //   });
    // });
    await loginModal.executeLogin(process.env.DEFAULT_USERNAME!, process.env.DEFAULT_PASSWORD!);

    await page.waitForTimeout(500);
    await settinsApi.putSettings({ currency: 'usd' });
    await settinsApi.putSettings({ distanceUnits: 'km' });
    await page.waitForTimeout(500);

    const respRequestFromTest= await request.put('/api/users/settings', { data: {
      distanceUnits: 'km' }
    });
    console.log('respRequestFromTest', await respRequestFromTest.json());

    // const apiClient = await apiRequest.newContext();
    // const respWithoutContext = await apiClient.put('/api/users/settings', { data: {
    //   distanceUnits: 'km' }
    // });
    // console.log('Response without context', await respWithoutContext.json());

    await page.reload();
  });


  test.afterEach(async({ }) => {
    await settinsApi.putSettings({ currency: 'usd' });
    await settinsApi.putSettings({ distanceUnits: 'km' });
  });

  test('Settings with API Interception', { tag: ['@api'] },async({ page }) => {
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

      /// ------------
      // API REQUEST INTERCEPT WITH GLOB PATTERN
      const requestPromiseGlob = page.waitForRequest('**/api/users/settings');
      const responsePromiseGlob = page.waitForResponse('**/api/users/settings');
 
      await settingsPage.selectCurrency('EUR');

      const requestGlob = await requestPromiseGlob;
      console.log('requestGlob', requestGlob.headers());
      const responseGlob = await responsePromiseGlob;
      console.log('responseGlob', await responseGlob.json());


      // API REQUEST INTERCEPT WITH CALLBACK
      const requestPromiseCb = page.waitForRequest(request =>
        request.url().includes('/api/users/settings') && request.method() === 'PUT',
      );
      const responsePromiseCb = page.waitForResponse(response =>
        response.url().includes('/api/users/settings') && response.request().method() === 'PUT',
      );
      await settingsPage.selectUnits('ml');
      
      const requestCb = await requestPromiseCb;
      expect(requestCb.headers()).toEqual(expect.objectContaining({
        cookie: expect.stringContaining('sid='),
      }));
      const responseCb = await responsePromiseCb;
      expect(await responseCb.json()).toEqual(expect.objectContaining({
        data: { distanceUnits: 'ml' }
      }));
      await page.waitForTimeout(2000);

      /// ------------
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

  test('Settings with API Mocking and Modification', { tag: ['@api'] },async({ page }) => {
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

      /// ------------
      // API TOURE - FEATCH AND FULLFILL WITH REAL BUT MODIFIED RESPNSE
      await page.route('**/api/users/settings', async(route, request) => {
        if(!request.postDataJSON()['currency']) {
          await route.fallback();
          return;
        }  else {
          const response = await route.fetch();
          const json = await response.json();
          json.data.currency = 'gbp'; // Modify the currency
          await route.fulfill({
            response,
            json
          });
        }
      });

      await settingsPage.selectCurrency('EUR');

      await settingsPage.selectUnits('ml');
      

      await page.reload();
      await settingsPage.isCurrencySelected('EUR'); // Due to being fulfileld with replaced response above
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


test('Settings API test without login on UI and with new generaged APIConext', { tag: ['@api'] },async() => {
  const apiClient = await apiRequest.newContext();
  const authAPI = new AuthenticationAPI(apiClient);
  const settingsAPI = new SettingsAPI(apiClient);
  let respWithoutContext = await settingsAPI.putSettings({ distanceUnits: 'km' });
  console.log('Response without context', await respWithoutContext.json());
  const respLogin = await authAPI.login(process.env.DEFAULT_USERNAME as string, process.env.DEFAULT_PASSWORD as string);
  console.log('Response login', await respLogin.json());
  respWithoutContext = await settingsAPI.putSettings({ distanceUnits: 'km' }, {
    cookie: respLogin.headers()['set-cookie'],
    Authorization: 'Bearer ' + respLogin.headers()['authorization']
  });
  console.log('Response without context after login', await respWithoutContext.json());
  expect(respWithoutContext.ok()).toBeTruthy();
  expect(respWithoutContext.status()).toBe(200);
  expect(await respWithoutContext.json()).toEqual(expect.objectContaining(
    { status: 'ok', data: { distanceUnits: 'km' } }));
});

const locales = {
  en: {
    'login.dialog.confirmation.button': 'Log in'
  },
  de: {
    'login.dialog.confirmation.button': "ButtunInDE"
  }
}

<div data-test='key1'>

currentLocale = 'en'

const allLocators = Object.keys(locales[currentLocale]);
const locator = locales[currentLocale].key1
async function getString(dataTestLocator: string) {
  return page.getByTestId(dataTestLocator);
}
for await(const key of allLocators) {
  await getString(key).toHaveText(locales[currentLocale][key]);
}