describe('template spec', () => {
  it('passes', () => {
    cy.visit('')  // Visits the baseUrl by default
    cy.get('[data-test-id="home-brand"]').should('have.text', 'Interlinked')
  })
})