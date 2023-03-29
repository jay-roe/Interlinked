describe('Admin login/logout', () => {
  let emailAdmin = 'admin@interlinked.live';
  let pwAdmin = '1234567';

  before(() => {
    cy.visit('login');
    cy.get('input[name=email]').type(emailAdmin);
    cy.get('input[name=password]').type(pwAdmin);

    cy.get('[data-testid=login]').click();
  });

  after(() => {
    cy.get('[data-testid=nav-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-testid=nav-logout]')
      .should('be.visible')
      .click({ force: true });
  });

  it('admin login/logout', () => {
    cy.visit('/admin');
  });
});

describe('Admin login to admin page', () => {
  let emailAdmin = 'admin@interlinked.live';
  let pwAdmin = '1234567';

  before(() => {
    cy.visit('login');
    cy.get('input[name=email]').type(emailAdmin);
    cy.get('input[name=password]').type(pwAdmin);

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

  it('click readAll', () => {
    cy.visit('/admin');
    cy.get('[data-testid=read-all-button]').click();
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
