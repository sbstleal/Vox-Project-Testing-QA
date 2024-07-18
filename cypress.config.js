const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'kgaiv7',
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    baseUrl: 'https://www.saucedemo.com',
    pageLoadTimeout: 180000,
    specPattern: 'cypress/e2e/my-sauce-demo/**/*.cy.js',
  },
});