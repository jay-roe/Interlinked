describe('Admin login to admin page', () => {
  let email = 'admin@interlinked.live';
  let pw = '1234567';

  before(() => {
    cy.visit('login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pw);

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
