describe('Full auth spec', () => {
  let email = 'test+cypress@test.com';
  let pw = '123456';

  it('can register, logout, login and delete ', () => {
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
    cy.get('[data-testid=nav-menu]').click();
    cy.get('[data-testid=nav-logout]').click();

    cy.get('[data-testid=base-msg]');

    // login
    cy.get('[data-testid="nav-login"]').click();

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pw);

    cy.get('[data-testid=login]').click();

    cy.get('[data-testid=welcome-msg]').should('contain', 'Welcome');

    // delete
    cy.visit('/edit-profile');
    cy.get('[data-testid=danger-zone]').click({ force: true }); // in emulator mode, the button is hidden so we need to force

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

  it('can not login with invalid credentials', () => {
    cy.visit('login');
    cy.get('[data-testid="nav-login"]').click();

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type('wrong pw');

    cy.get('[data-testid=login]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Failed to login');
    });
  });
});
