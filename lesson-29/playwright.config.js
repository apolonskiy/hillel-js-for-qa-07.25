// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: `./configs/.env.${process.env.ENV_NAME || 'qauto'}` }); //for custom configs
// dotenv.config({ path: `./lesson-25/configs/.env.${process.env.ENV_NAME || 'qauto'}` }); // for IDE debug


// dotenv.config(); // for default .env file

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: [['html', { open: 'on-failure' }], ['list'], ['json', {  outputFile: './test-results/json/test-results.json' }]],
  // reporter: [['blob', { outputFile: `./blob-report/report-${process.env.CI_NODE_INDEX}.zip` }]],
  // reporter: [
  //   ['list'],
  //   ['html', { open: 'on-failure' }],
  //   [
  //   // new way
  //     '@testomatio/reporter/playwright',
  //     {
  //       apiKey: 'tstmt_P7ClK20R5k88bZRingcsEmSpXHxjEahXTQ1754068143',
  //     },
  //   ],
  // ],
  // reporter:[['line'], ['html'], ['allure-playwright']],
  reporter: [ ['github'], ['html'], ['junit', { outputFile: 'results.xml' }]],
  timeout: 120_000,
  expect: { 
    timeout: 5_000,

    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    testIdAttribute: 'data-testid',
    actionTimeout: 5_000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'https://qauto.forstudy.space',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: true,
    // viewport: { width: 1920, height: 1080 },
    video: 'on', //'on-first-retry',
    trace: 'on', //'on-first-retry',
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    

    // {
    //   name: 'chrome-qauto2',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome', baseURL:  'https://qauto2.forstudy.space', viewport: { width: 2800, height: 1920 } },
    // },

    { name: 'setup', testMatch: /.*\.setup\./, use: { 
      ...devices['Desktop Chrome'], 
      channel: 'chrome',
      // viewport: { width: 1920, height: 1080 } 
    } },

    {
      name: 'chrome-setup',
      testMatch: /.*\-dependencies/,
      use: { ...devices['Desktop Chrome'], 
        channel: 'chrome',  
        storageState: '.auth/user.json',
        // viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['setup'],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

