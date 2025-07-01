import { defineConfig } from "cypress";

export default defineConfig({
  retries: {
    runMode: process.env.CI ? 2 : 0,
    openMode: 0
  },
  video: true,
  viewportHeight: 720,
  viewportWidth: 1080,
  e2e: {
    specPattern: 'cypress/e2e/**/*.test.{js,jsx,ts,tsx}',
    baseUrl: 'https://qauto.forstudy.space',
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
      // implement node event listeners here
    },
  },
});