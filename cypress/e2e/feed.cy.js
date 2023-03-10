import { email, pw } from '../support/e2e';

describe('Full feed spec', async () => {
  before(() => {
    cy.login(email, pw);
  });

  after(() => {
    cy.logout();
  });

  let postMessage = 'Test Post';
  // TODO this should include deleting posts once we have the capability

  it('can post', () => {
    cy.visit('feed');
    // create post
    cy.get('[data-testid=post-content]').type(postMessage);
    cy.get('input[type=file]').attachFile('feed/test_image.jpeg');
    cy.get('input[type=file]').attachFile('feed/test_image2.png');

    cy.get('[data-testid=post-content]').should('contain', postMessage);
    cy.get('[data-testid=remove-image-0]').click();

    cy.get('[data-testid=remove-image-1]').should('not.exist');

    cy.get('[data-testid=post-button]').click();

    cy.get('[data-testid=post-content]').should('contain', '');
    cy.get('[data-testid=remove-image-0]').should('not.exist');

    // verify that feed is updated
    cy.visit('/feed'); // Refresh page to see post at top

    cy.get('[data-testid=post-card-0]').should('contain', postMessage);
    cy.get('[data-testid=test-image-0]')
      .should('have.attr', 'src')
      .should('include', 'test_image');
    //cy.get('[data-testid=test-image-1]').should('not.exist');  // Uncomment when double image bugfix is complete

    // liking
    cy.get('[data-testid=post-card-0]').within(() => {
      cy.get('[data-testid=like-btn]').click();
    });
    cy.get('[data-testid=post-card-0]').within(() => {
      cy.get('[data-testid=like-btn]').within(() => {
        cy.get('[data-testid=liked]');
      });
    });

    // commenting
    let comment = 'testComment';
    cy.get('[data-testid=post-card-0]').within(() => {
      cy.get('[data-testid=comment-btn]').click();
    });

    cy.get('[data-testid=add-comment-content-0]').type(comment);
    cy.get('[data-testid=add-comment-to-post-0]').click();

    cy.get('[data-testid=comment-body-0-0]').should('contain', comment);

    // get more posts
    cy.get('[data-testid="load-more-button"]').click();
    cy.get('[data-testid="load-more-button"]').should(
      'contain',
      'No more posts'
    );
  });
});
