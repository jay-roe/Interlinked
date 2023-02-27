describe('Full auth spec', () => {
  let email = 'test+cypress@test.com';
  let pw = '123456';

  it('can register', () => {
    cy.visit('register');

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pw);
    cy.get('input[name=confirmPassword]').type(pw);

    cy.get('[data-testid=register]').click();

    cy.get('[data-testid=profile-title]').should('contain', 'No name provided'); // Makes sure we made it to the profile
  });

  it('can logout', () => {
    cy.visit('');
    cy.get('[data-testid=nav-logout]').click();

    cy.visit('');
    cy.get('[data-testid=base-msg]').should(
      'contain',
      'We will become interlinked.'
    );
  });

  it('can login', () => {
    cy.visit('');
    cy.get('[data-testid="nav-login"]').click();

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pw);

    cy.get('[data-testid=login]').click();

    cy.get('[data-testid=welcome-msg]').should('contain', 'Welcome');
  });

  it('can delete', () => {
    cy.visit('/edit-profile');
    cy.get('[data-testid=danger-zone]').click();

    cy.get('[data-testid=pw-field]').type(pw);
    cy.get('[data-testid=del-acc]').click();

    cy.get('[data-testid=base-msg]').should(
      'contain',
      'We will become interlinked.'
    );
  });
});
