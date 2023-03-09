// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@cypress/code-coverage/support';
import 'cypress-file-upload';
import './commands';

Cypress.Commands.add('login', (email, pw) => {
  cy.visit('login');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(pw);

  cy.get('[data-testid=login]').click();

  cy.get('[data-testid=welcome-msg]').should('contain', 'Welcome');
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid=nav-logout]').click();

  cy.get('[data-testid=base-msg]').should(
    'contain',
    'We will become interlinked.'
  );
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
