import { adminEmail, adminPw } from '../support/e2e';

describe('Admin login to admin page', () => {
  before(() => {
    cy.visit('login');
    cy.get('input[name=email]').type(adminEmail);
    cy.get('input[name=password]').type(adminPw);

    cy.get('[data-testid=login]').click();
  });

  after(() => {
    cy.visit('');
    cy.get('[data-testid=nav-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-testid=nav-logout]')
      .should('be.visible')
      .click({ force: true });
  });

  it('can visit admin page', () => {
    cy.visit('/admin');
  });
});

describe('User can not login to admin page', () => {
  it('can visit admin page', () => {
    cy.visit('/admin');
    cy.get('[data-testid=base-msg]').should(
      'contain',
      'We will become interlinked.'
    );
  });
});
