describe('View Links Spec', async () => {
  let email = 'test2+cypress@test.com';
  let pw = '123456';

  before(() => {
    cy.login(email, pw);
  });

  after(() => {
    cy.logout();
  });

  it('can visit link page', () => {
    cy.visit('profile');

    cy.get('[data-testid=view-link-button]').click();
    cy.get('[data-testid=welcome-msg]').should(
      'contain',
      "Let's see who your links are."
    );
    cy.get('[data-testid=no-load-more]').should('contain', 'No more links 😥');

    cy.get('[data-testid=profile-card-0]').click();
    cy.get(cy.get('[data-testid=view-link-button]').click());
    cy.get('[data-testid=welcome-msg]').should(
      'not.contain',
      "Let's see who your links are."
    );
  });
});
