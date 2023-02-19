const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 30000
  },
});
