describe('View Links Spec', async () => {
  let email = 'test2+cypress@test.com';
  let pw = '123456';

  before(() => {
    cy.login(email, pw);
    cy.visit('/profile');
  });

  after(() => {
    cy.logout();
  });

  it('can visit link page', async () => {
    cy.get('[data-testid=view-link-button]').click();

    cy.get('[data-testid=welcome-msg]').should(
      'contain',
      "Let's see who your links are."
    );
  });
});
