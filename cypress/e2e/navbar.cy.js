import { email, pw } from '../support/e2e';

describe('Full navbar spec', () => {
  before(() => {
    cy.login(email, pw);
  });

  it('can navigate', () => {
    cy.visit('');

    cy.get('[data-testid=nav-menu]').click();
    cy.get('[data-testid=nav-menu-profile]').click();
    cy.url().should('contain', '/profile');

    cy.get('[data-testid=nav-menu]').click();
    cy.get('[data-testid=nav-menu-edit-profile]').click();
    cy.url().should('contain', '/edit-profile');

    cy.get('[data-testid=nav-menu]').click();
    cy.get('[data-testid=nav-menu-settings]').click();

    cy.get('[data-testid=nav-menu]').click();
    cy.get('[data-testid=nav-logout]').click();
    cy.get('[data-testid=base-msg]').should('exist');
  });
});
