const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
    baseUrl: 'http://localhost:3000/en',
    defaultCommandTimeout: 60000,
    requestTimeout: 60000,
  },
});
