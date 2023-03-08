describe('Full navbar spec', async () => {
  let email = 'test2+cypress@test.com';
  let pw = '123456';

  before(() => {
    cy.login(email, pw);
  });

  after(() => {
    cy.logout();
  });

  it('can navigate', () => {
    cy.get('[data-testid=nav-menu]').click();
    cy.get('[data-testid=nav-menu-profile]').click();
    cy.url().should('contain', '#profile');

    cy.get('[data-testid=nav-menu]').click();
    cy.get('[data-testid=nav-menu-settings]').click();
    cy.url().should('contain', '#settings');

    cy.get('[data-testid=nav-menu]').click();
    cy.get('[data-testid=nav-menu-logout]').click();
    cy.url().should('contain', '#logout');
  });
});
