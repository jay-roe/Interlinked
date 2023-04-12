describe('Entire report flow', () => {
  let emailAdmin = 'admin@interlinked.live';
  let pwAdmin = '1234567';

  let emailReporter = 'verycool@test.com';
  let pwReporter = '123456';

  let emailReported = 'test2+cypress@test.com';
  let pwReported = '123456';

  const login = (email, pw) => {
    cy.visit('login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pw);
    cy.get('[data-testid=login]').click();
    cy.get('[data-testid=welcome-msg]').should('contain', 'Welcome');
  };

  const loginAdmin = (email, pw) => {
    cy.visit('login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pw);
    cy.get('[data-testid=login]').click();
    cy.get('[data-testid=base-msg]').should(
      'contain',
      'We will become interlinked.'
    );
  };

  const logout = () => {
    cy.visit('');
    cy.get('[data-testid=nav-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-testid=nav-logout]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-testid=base-msg]').should(
      'contain',
      'We will become interlinked.'
    );
  };

  const reportUser = () => {
    cy.visit('/DM');
    cy.get('[data-testid=chatroom-card-test-id]').click();
    cy.get('[data-testid=report-user-btn]').click();
    cy.on('window:confirm', () => true);
    cy.on('window:alert', (txt) => {
      //Assertion
      expect(txt).to.contain('User reported!');
    });
  };

  it('Everything', () => {
    //Discard report
    //Login as reporter
    login(emailReporter, pwReporter);

    //Report a user
    reportUser();

    //Logout user
    logout();

    //Login as admin
    loginAdmin(emailAdmin, pwAdmin);

    //Discard report
    cy.visit('/admin');
    cy.get('[data-testid=post-notification]').click();
    cy.get('[data-testid=discard-report]').click();
    cy.visit('/admin');

    //Logout admin
    logout();

    //--------------------------------------------------------------------------------
    //Delete report
    //Login as reporter
    login(emailReporter, pwReporter);

    //Report a user
    reportUser();

    //Logout user
    logout();

    //Login as admin
    loginAdmin(emailAdmin, pwAdmin);

    //Delete report
    cy.visit('/admin');
    cy.get('[data-testid=delete-report-btn]').click();
    cy.get('[data-testid=no-reports]').should('contain', 'Wow, such empty');

    //Logout admin
    logout();

    //--------------------------------------------------------------------------------
    //Lock user account
    //Login as reporter
    login(emailReporter, pwReporter);

    //Report a user
    reportUser();

    //Logout user
    logout();

    //Login as admin
    loginAdmin(emailAdmin, pwAdmin);

    //Lock account
    cy.visit('/admin');
    cy.get('[data-testid=read-all-button]').click();
    cy.get('[data-testid=post-notification]').click();
    cy.get('[data-testid=lock-report]').click();
    cy.visit('/admin');

    //Logout admin
    logout();

    //Login as locked account
    login(emailReported, pwReported);

    //Logout locked account
    cy.get('[data-testid=locked-account-logout]').should('be.visible').click();

    //----------------------------------------------
    //Unlock an account
    //Login as admin
    loginAdmin(emailAdmin, pwAdmin);

    //Unlock account
    cy.visit('/admin');
    cy.get('[data-testid=list-of-banned-users-btn]').click();
    cy.get('[data-testid=unban-account-btn]').click();
    cy.visit('/admin');

    //Logout admin
    logout();

    //--------------------------------------------------------------------------------
    //Timeout an account
    //Login as reporter
    login(emailReporter, pwReporter);

    //Report a user
    reportUser();

    //Logout user
    logout();

    //Login as admin
    loginAdmin(emailAdmin, pwAdmin);

    //Timeout account
    cy.visit('/admin');
    cy.get('[data-testid=post-notification]').click();
    cy.get('[data-testid=timeout-report]').click();
    cy.get('[data-testid=timeout-report-120000]').click();
    cy.visit('/admin');

    //Logout admin
    logout();

    //Login as timeout account
    login(emailReported, pwReported);

    //Logout timeout account
    cy.get('[data-testid=timeout-account-logout]').should('be.visible').click();
  });
});
