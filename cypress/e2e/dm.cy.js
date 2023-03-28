describe('DM spec', () => {
  let email = 'test2+cypress@test.com';
  let pw = '123456';

  before(() => {
    cy.login(email, pw);
  });

  after(() => {
    cy.logout();
  });

  it('can dm', () => {
    // go to my profile
    cy.get('[data-testid=nav-menu]').click();
    cy.get('[data-testid=nav-menu-profile]').click();
    cy.url().should('contain', '/profile');
    cy.get('[data-testid=profile-title]').should('exist');

    // click my links
    cy.get('[data-testid=view-link-button]').click();
    cy.get('[data-testid=title]').should('contain', 'Links');

    // click verycool
    cy.get('[data-testid=profile-card-0]').click();
    cy.get('[data-testid=profile-title]').should('contain', 'verycool');

    // click message
    cy.get('[data-testid=modal-button]').click();

    // send message
    let testMessage = 'This is a test message!';
    cy.get('[data-testid=chat-modal-input]').type(testMessage);
    cy.get('[data-testid=chat-modal-button]').click();
    cy.get('[data-testid=chat-room-root]').should('contain', testMessage);

    // visit dm room
    cy.get('[data-testid=nav-dm]').click();

    // select the only dm
    cy.get('[data-testid=chatroom-giNIZZIhptwtFmeLJZru]').click();
    cy.url().should('contain', 'giNIZZIhptwtFmeLJZru');

    //can type in the modal
    let newMessage = 'You wanna come over tonight?';
    cy.get('[data-testid=dm-page-message]').type(newMessage);
    cy.get('[data-testid=send-dm]').click();
    cy.get('[data-testid=chat-room-root]').should('contain', newMessage);

    let timeDividerText = "March 10, 2023";  // This is directly from emulator export please do not change
    cy.get('[data-testid=chat-room-root]').should('contain', timeDividerText);
  });
});
