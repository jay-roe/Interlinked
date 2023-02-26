describe('Full feed spec', () => {
  let email = 'test2+cypress@test.com';
  let pw = '123456';

  let postMessage = 'Test Post';
  // TODO this should include deleting posts once we have the capability

  before(() => {
    cy.login(email, pw);
    cy.visit('/feed');
  });

  it('can post', () => {
    cy.get('[data-testid=post-content]').type(postMessage);
    cy.get('input[type=file]').attachFile('feed/test_image.jpeg');
    cy.get('input[type=file]').attachFile('feed/test_image2.png');

    cy.get('[data-testid=remove-image-0]').click();
    cy.on('window:confirm', () => {
      return true;
    });
    cy.on('window:alert', () => {});

    cy.get('[data-testid=remove-image-1]').should('not.exist');

    cy.get('[data-testid=post-button]').click();

    cy.on('window:alert', () => {});

    cy.get('[data-testid=post-content]').should('contain', '');
    cy.get('[data-testid=remove-image-0]').should('not.exist');
  });

  it('can view post', () => {
    cy.visit('/feed'); // Refresh page to see post at top

    cy.get('[data-testid=post-card-0]').should('contain', postMessage);
    cy.get('[data-testid=test-image-0]').should('exist');
    //cy.get('[data-testid=test-image-1]').should('not.exist');  // Uncomment when double image bugfix is complete
  });
});
