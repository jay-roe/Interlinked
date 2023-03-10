describe('Sample spec', () => {
  it('renders the title', () => {
    cy.visit(''); // Visits the baseUrl by default
    cy.get('[data-testid="home-brand"]').should('have.text', 'INTERLINKED');
  });
});
