const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },

  viewportWidth: 1440,
  viewportHeight: 660,
  chromeWebSecurity: false,
  reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: true,
    html: false,
    json: true,
    screenshotOnRunFailure: true,
    embedVideo: true,
    includeScreenshots: true,
  },
  pageLoadTimeout: 10000,
});