describe('Full navbar spec', async () => {
  it('can navigate', () => {
    cy.visit('');

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
