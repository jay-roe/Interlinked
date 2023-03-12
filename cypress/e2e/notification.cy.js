describe('Full notification spec', async () => {
  let email = 'test2+cypress@test.com';
  let pw = '123456';

  before(() => {
    cy.login(email, pw);
    cy.visit('/notification');
  });

  after(() => {
    cy.logout();
  });

  it('notifications are sent and displayed', () => {});
});
