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

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');

  cy.get('input[name=email]').type(email);

  // {enter} causes the form to submit
  cy.get('input[name=password]').type(`${password}{enter}`, { log: false });

  cy.get('[data-testid=welcome-msg]').should('exist');
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid=nav-logout]').click();

  cy.get('[data-testid=base-msg]').should('exist');
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
