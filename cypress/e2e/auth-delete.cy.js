describe('Full auth spec', () => {
  let pw = '123456';

  it('can delete', () => {
    // delete
    cy.visit('/edit-profile');
    cy.get('[data-testid=danger-zone]').click();

    cy.get('[data-testid=pw-field]').type('wrong pw');
    cy.get('[data-testid=del-acc]').click();
    cy.get('[data-testid=incorrect-pw]').should(
      'contain',
      'Incorrect password.'
    );

    cy.get('[data-testid=pw-field]').clear().type(pw);
    cy.get('[data-testid=del-acc]').click();

    cy.get('[data-testid=base-msg]').should(
      'contain',
      'We will become interlinked.'
    );
  });
});
