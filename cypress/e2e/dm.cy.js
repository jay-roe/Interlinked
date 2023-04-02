describe('DM spec', () => {
  let email = 'test2+cypress@test.com';
  let pw = '123456';

  before(() => {
    cy.login(email, pw);
  });

  after(() => {
    cy.logout();
    //cy.visit('DM/giNIZZIhptwtFmeLJZru');
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
    let newMessage = 'This message has an image';
    let otherMessage = 'this message is alone';
    cy.get('[data-testid=dm-text-input]').type(newMessage);

    //attach then remove image
    cy.get('input[type=file]').attachFile('feed/test_image.jpeg');
    cy.get('[data-testid=dm-remove-image-button]').click(); //remove image
    cy.get('[data-testid=dm-remove-image-button]').should('not.exist'); // button should not exist

    //attach then remove file
    cy.get('input[type=file]').attachFile('feed/changes.txt');
    cy.get('[data-testid=dm-remove-file-button]').click();
    cy.get('[data-testid=dm-remove-file-button]').should('not.exist');

    // attach image then post
    cy.get('input[type=file]').attachFile('feed/test_image.jpeg');
    cy.get('[data-testid=send-dm]').click();
    cy.get('[data-testid=chat-room-root]').should('contain', newMessage);

    // create new message only text
    cy.get('[data-testid=dm-text-input]').type(otherMessage);
    cy.get('[data-testid=send-dm]').click();
    cy.get('[data-testid=chat-room-root]').should('contain', newMessage);

    // creat new message with file only
    cy.get('input[type=file]').attachFile('feed/changes.txt');
    cy.get('[data-testid=dm-remove-file-button]').should('exist');
    cy.get('[data-testid=send-dm]').click();
    cy.get('[data-testid=file-preview-dm]').should('not.exist');

    //send empty message
    // cy.get('[data-testid=dm-text-input]').should('contain','')
    cy.get('[data-testid=dm-text-input]').invoke('val', '');
    cy.get('[data-testid=send-dm]').click();
    cy.get('[data-testid=send-dm]').should('exist');

    cy.get('[data-testid=dm-button-file-upload]').click();
    let timeDividerText = 'March 10, 2023'; // This is directly from emulator export please do not change
    cy.get('[data-testid=chat-room-root]').should('contain', timeDividerText);
  });
});
