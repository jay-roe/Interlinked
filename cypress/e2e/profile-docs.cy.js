/* my super cool cypress algorithm:
  1. log into test2 account
  2. View test2's profile page
  3. go to edit profile
  4. click on add resume and save resume
  5. save changes 
  6. view profile page and check if there's a resume and click on resume
  7. go to edit profile
  8. click on add a cover letter and save cover letter
  9. save changes
  10. view profile page and check if there's a cover letter and click on cover letter

*/

describe('Full profile documents spec', async () => {
  let email = 'test2+cypress@test.com';
  let pw = '123456';

  before(() => {
    cy.login(email, pw);
  });

  after(() => {
    cy.logout();
  });

  it('documents are viewed and edited', () => {
    cy.visit('/profile/');

    cy.visit('/edit-profile');

    //uploading a resume
    cy.get('[data-testid=doc-add-resume-button]').should('exist');
    cy.get('[data-testid=doc-add-resume-button]').click();

    cy.get('[data-testid=upload-resume-btn]').should('exist');
    cy.get('[data-testid=input-resume]').attachFile('documents/resume.pdf');
    cy.get('[data-testid=resume-check]').should('exist');

    let newResumeName = 'MY NEW RESUME';
    cy.get('[data-testid=change-resume-name]').should('exist');
    cy.get('[data-testid=change-resume-name]').clear().type(newResumeName);
    cy.get('[data-testid=resume-save-btn]').click();
    //cy.get('[data-testid=editable-resume]').should('exist');

    //uploading a cover letter
    cy.get('[data-testid=doc-add-cover-letter-button]').should('exist');
    cy.get('[data-testid=doc-add-cover-letter-button]').click();

    cy.get('[data-testid=upload-coverletter-btn]').should('exist');
    cy.get('[data-testid=input-coverletter]').attachFile(
      'documents/coverletter.pdf'
    );
    cy.get('[data-testid=coverletter-check]').should('exist');

    let newCoverName = 'MY NEW COVER LETTER';
    cy.get('[data-testid=change-cover-name]').should('exist');
    cy.get('[data-testid=change-cover-name]').clear().type(newCoverName);
    cy.get('[data-testid=cover-letter-save-btn]').click();
    cy.get('[data-testid=editable-cover-letter]').should('exist');

    //saving all changes on the edit profile
    cy.get('[data-testid=update-account-button2]').click();

    //view changes on profile
    cy.visit('/profile/');

    //deleting and editing uploaded files
    cy.visit('/edit-profile/');

    cy.get('[data-testid=editable-resume]').should('exist');
    cy.get('[data-testid=editable-cover-letter]').should('exist');

    //edit a second time resume name
    cy.get('[data-testid=resume-edit-button]').should('exist');
    cy.get('[data-testid=resume-edit-button]').click();

    let secondResumeName = 'A BETTER RESUME';
    cy.get('[data-testid=change-resume-name]').should('exist');
    cy.get('[data-testid=change-resume-name]').clear().type(secondResumeName);
    cy.get('[data-testid=resume-save-btn]').click();
    cy.get('[data-testid=editable-resume]').should('exist');

    //delete both documents

    cy.get('[data-testid=delete-resume-btn]').should('exist');
    cy.get('[data-testid=delete-resume-btn]').click();

    cy.get('[data-testid=delete-cover-letter-btn]').should('exist');
    cy.get('[data-testid=delete-cover-letter-btn]').click();
    cy.get('[data-testid=doc-add-cover-letter-button]').should('exist');
    cy.get('[data-testid=doc-add-cover-letter-button]').click();
    cy.get('[data-testid=delete-cover-letter-btn]').should('exist');
    cy.get('[data-testid=delete-cover-letter-btn]').click();

    //saving all changes on the edit profile
    cy.get('[data-testid=update-account-button2]').click();

    //   cy.get('[data-testid=delete-cover-letter-btn]').click();
    //   cy.visit('/profile');
  });
});
