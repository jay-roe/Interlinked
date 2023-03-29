/* my super cool cypress algorithm:
  1. log into test2 account
  2. visit melisa's account
  3. send a link request to melisa
  4. log out of test account
  5. log into melisa's account
  5. check if there is a link request notification
  6. accept the link request
  7. log out of melisa's account
  8. log into test account
  9. check if there is a link accept notification
*/

describe('Full notification spec', async () => {
  let email = 'test2+cypress@test.com';
  let melEmail = 'melisa@melisa.ca';
  let pw = '123456';
  let melUserId = 'Jc9kqYwRz2WaxnyVFomnxdmKbZaw';

  before(() => {
    cy.login(email, pw);
  });

  after(() => {
    cy.logout();
  });

  it('notifications are sent and displayed', () => {
    cy.visit('/profile/' + melUserId);
    cy.get('[data-testid=link-btn]').click();

    cy.logout();
    cy.login(melEmail, pw);

    cy.visit('/notifications');

    cy.get('[data-testid=accept-link-button]').click();

    cy.logout();
    cy.login(email, pw);

    cy.visit('/notifications');

    cy.get('[data-testid=link-acc-notification]').should('exist');
    cy.get('[data-testid=read-all-button]').click();
    cy.get('[data-testid=clear-notif-btn]').click();

    cy.visit('/');
  });
});
