describe('Full auth spec', () => {
  let email = 'test+cypress@test.com';
  let pw = '123456';

  it('can register, logout, login ', () => {
    // register (email and pw)
    cy.visit('register');

    // not matching
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pw);
    cy.get('input[name=confirmPassword]').type('wrongPw');

    cy.get('[data-testid=register]').click();
    cy.on('window:alert', (msg) => {
      expect(msg).to.contains('Passwords do not match');
    });

    // matching
    cy.get('input[name=email]').clear().type(email);
    cy.get('input[name=password]').clear().type(pw);
    cy.get('input[name=confirmPassword]').clear().type(pw);

    cy.get('[data-testid=register]').click();

    cy.get('[data-testid=welcome-msg]').should('contain', 'Welcome'); // Makes sure we made it to the profile

    // logout
    cy.get('[data-testid=nav-logout]').click();

    cy.get('[data-testid=base-msg]').should(
      'contain',
      'We will become interlinked.'
    );

    // login
    cy.get('[data-testid="nav-login"]').click();

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pw);

    cy.get('[data-testid=login]').click();

    cy.get('[data-testid=welcome-msg]').should('contain', 'Welcome');
  });
});
