// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('login', (email, pw) => {
  cy.visit('login');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(pw);

  cy.get('[data-testid=login]').click();

  cy.get('[data-testid=welcome-msg]').should('contain', 'Welcome');
});

Cypress.Commands.add('logout', () => {
  cy.visit('');
  cy.get('[data-testid=nav-menu]').click();
  cy.get('[data-testid=nav-logout]').click();

  cy.get('[data-testid=base-msg]').should(
    'contain',
    'We will become interlinked.'
  );
});
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
