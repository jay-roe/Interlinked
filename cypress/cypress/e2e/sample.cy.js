describe('Sample spec', () => {
  it('renders the title', () => {
    cy.visit('')  // Visits the baseUrl by default
    cy.get('[data-testid="home-brand"]').should('have.text', 'Interlinked')
  })

  // As you can see, if the front or backend isn't running, this test will fail. TRUE end-to-end action baby
  it('gets data from the backend', () => {
    cy.visit('cypressDemo')
    cy.get('[data-testid="demo-button"]').click()
    cy.get('[data-testid="demo-component"]').should('contain', "route of the backend")
  })
})