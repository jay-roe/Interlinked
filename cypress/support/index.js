Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

Cypress.on('test:before:run', () => {
  Cypress.automation('remote:debugger:protocol', {
    command: 'Emulation.setLocaleOverride',
    params: {
      locale: 'en-GB',
    },
  });
});
