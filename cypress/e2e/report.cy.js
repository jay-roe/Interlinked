// describe('Admin discard report', () => {
//   let email = 'admin@interlinked.live';
//   let pw = '1234567';

//   //Login
//   before(() => {
//     cy.visit('login');
//     cy.get('input[name=email]').type(email);
//     cy.get('input[name=password]').type(pw);

//     cy.get('[data-testid=login]').click();
//   });

//   //Logout
//   after(() => {
//     cy.visit('');
//     cy.get('[data-testid=nav-menu]')
//       .should('be.visible')
//       .click({ force: true });
//     cy.get('[data-testid=nav-logout]')
//       .should('be.visible')
//       .click({ force: true });
//   });

//   it('can visit admin page', () => {
//     cy.visit('/admin');
//   });

//   //Discard report
//   it('click report and discard', () => {
//     cy.visit('/admin');
//     cy.get('[data-testid=post-notification]').click();
//     cy.get('[data-testid=discard-report]').click();
//     cy.visit('/admin');
//   });
// });

describe('Admin lock account in report', () => {
  let emailAdmin = 'admin@interlinked.live';
  let pwAdmin = '1234567';

  let email = 'verycool@test.com';
  let pw = '123456';

  //Login
  before(() => {
    cy.visit('login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pw);

    cy.get('[data-testid=login]').click();
  });

  //Logout
  after(() => {
    cy.visit('');
    cy.get('[data-testid=nav-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-testid=nav-logout]')
      .should('be.visible')
      .click({ force: true });
  });

  it('click report and lock account', () => {
    //Report a user
    cy.visit('/DM');
    cy.get('[data-testid=chatroom-card-test-id]').click();
    cy.get('[data-testid=report-user-btn]').click();

    //Logout of user
    cy.visit('');
    cy.get('[data-testid=nav-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-testid=nav-logout]')
      .should('be.visible')
      .click({ force: true });

    //Login as admin
    cy.visit('login');
    cy.get('input[name=email]').type(emailAdmin);
    cy.get('input[name=password]').type(pwAdmin);
    cy.get('[data-testid=login]').click();

    //Lock users account
    cy.visit('/admin');
    cy.get('[data-testid=post-notification]').click();
    cy.get('[data-testid=lock-report]').click();
    cy.visit('/admin');
  });
});

describe('Admin timeout account login', () => {
  let emailAdmin = 'admin@interlinked.live';
  let pwAdmin = '1234567';

  let emailReporter = 'verycool@test.com';
  let pwReporter = '123456';

  let emailReported = 'test2+cypress@test.com';
  let pwReported = '123456';

  //Login as reporter
  before(() => {
    cy.visit('login');
    cy.get('input[name=email]').type(emailReporter);
    cy.get('input[name=password]').type(pwReporter);

    cy.get('[data-testid=login]').click();
  });

  it('click report, timeout account, login with timeout account', () => {
    //Report a user
    cy.visit('/DM');
    cy.get('[data-testid=chatroom-card-test-id]').click();
    cy.get('[data-testid=report-user-btn]').click();

    //Logout user
    cy.visit('');
    cy.get('[data-testid=nav-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-testid=nav-logout]')
      .should('be.visible')
      .click({ force: true });

    //Login as admin
    cy.visit('login');
    cy.get('input[name=email]').type(emailAdmin);
    cy.get('input[name=password]').type(pwAdmin);
    cy.get('[data-testid=login]').click();

    //Timeout user
    cy.visit('/admin');
    cy.get('[data-testid=post-notification]').click();
    cy.get('[data-testid=timeout-report]').click();
    cy.get('[data-testid=timeout-report-120000]').click();

    //Logout admin
    cy.visit('');
    cy.get('[data-testid=nav-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-testid=nav-logout]')
      .should('be.visible')
      .click({ force: true });

    //Login as user
    cy.visit('login');
    cy.get('input[name=email]').type(emailReported);
    cy.get('input[name=password]').type(pwReported);

    //Logout cause in timeout
    cy.get('[data-testid=login]').click();
    cy.get('[data-testid=timeout-account-logout]').click();
  });
});

describe('Admin delete a report', () => {
  let emailAdmin = 'admin@interlinked.live';
  let pwAdmin = '1234567';

  let email = 'verycool@test.com';
  let pw = '123456';

  //Login as user
  before(() => {
    cy.visit('login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pw);

    cy.get('[data-testid=login]').click();
  });

  //Logout
  after(() => {
    cy.visit('');
    cy.get('[data-testid=nav-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-testid=nav-logout]')
      .should('be.visible')
      .click({ force: true });
  });

  it('delete a report', () => {
    //User report a user
    cy.visit('/DM');
    cy.get('[data-testid=chatroom-card-test-id]').click();
    cy.get('[data-testid=report-user-btn]').click();

    //Logout of user
    cy.visit('');
    cy.get('[data-testid=nav-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-testid=nav-logout]')
      .should('be.visible')
      .click({ force: true });

    //Login as admin
    cy.visit('login');
    cy.get('input[name=email]').type(emailAdmin);
    cy.get('input[name=password]').type(pwAdmin);
    cy.get('[data-testid=login]').click();

    //Delete the report from the /admin page
    cy.visit('/admin');
    cy.get('[data-testid=delete-report-btn]').click();
    cy.visit('/admin');
  });
});
