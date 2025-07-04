import { defineConfig } from "cypress";
import {addMatchImageSnapshotPlugin} from '@simonsmith/cypress-image-snapshot/plugin.js'
import * as path from 'path';
import * as fs from 'fs';

const getConfigFileObject = (env = 'dev') => {
  const configFilePath = path.join('cypress', 'fixtures', 'config', `cypress.env.${env}.json`);
  const configFileString = (fs.readFileSync(configFilePath)).toString();
  return JSON.parse(configFileString)
}

export default defineConfig({
  retries: {
    runMode: process.env.CI ? 2 : 0,
    openMode: 0
  },
  video: true,
  viewportHeight: 720,
  viewportWidth: 1080,
  env: {
    ADDITIONAL_VAR: 'some other str'
  },
  reporter: "mochawesome",
  reporterOptions: {
    overwrite: false,
    html: false,
    json: true
  },
  e2e: {
    specPattern: 'cypress/e2e/test/**/*.test.{js,jsx,ts,tsx}',
    baseUrl: 'https://qauto.forstudy.space',
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on)
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })

      // console.log(config)
      // console.log('This is INSIDE config file', process.env.BASE_URL);
      // config.env.BASE_URL=process.env.BASE_URL;
      // config.baseUrl = config.env.BASE_URL || process.env.BASE_URL || 'https://qauto.forstudy.space'
      const configOverrides = getConfigFileObject(process.env.TEST_ENVIRONMENT || 'dev')
      const envDefaultVars = {...config.env};
      config = {...config, ...configOverrides}
      config.env = {...config.env, ...envDefaultVars}
      console.log(config.baseUrl);
      return config;
    },
  },
});