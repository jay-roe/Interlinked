import { email, pw, recruiterEmail, recruiterPw } from '../support/e2e';

const keywords = [
  'prompt engineer',
  'java juicer',
  'backend badass',
  'swift swiftie',
  'prolog prodigy',
];

describe('Job notifications and keywords spec', () => {
  before(() => {
    cy.login(email, pw);
  });

  after(() => {
    cy.logout();
  });

  it('can choose notification keywords', () => {
    cy.visit('/edit-profile');

    // Open job notifications panel
    cy.get('[data-testid=job-hunt-edit-button]').click();
    cy.get('[data-testid=jobHunt-check]').check();

    // Add keywords
    keywords.forEach((keyword) => {
      cy.get('[data-testid=job-keywords-input]').type(keyword);
      cy.contains('button', keyword).click();
      cy.get('[data-testid=job-keywords-input]').clear();
    });

    // Save keywords in account
    cy.get('[data-testid=job-hunt-save-button]').click();
    cy.get('[data-testid=update-account-button]').click();
    cy.on('window:confirm', () => true);
    cy.on('window:alert', (txt) => {
      expect(txt).to.contain('Successfully updated your profile!');
    });
    cy.url().should('contain', '/profile');

    // Logout
    cy.logout();
  });

  // Recruiter create job posting with keywords
  it('can create job posting with keywords', () => {
    // Login as recruiter
    cy.login(recruiterEmail, recruiterPw);

    // Visit manage jobs
    cy.visit('/manage-jobs');

    // Create new job with random required content
    cy.get('[data-testid=create-new-job]').click();
    cy.get('[data-testid=change-title]').type('Coffin retriever');
    cy.get('[data-testid=change-description]').type('🫱⚰️🫲 ➡️☠️ ➡️💰');
    cy.get('[data-testid=change-location]').type('6 feet under Avenue');

    // Add 2 keywords
    for (let keywordIndex = 0; keywordIndex < 2; keywordIndex++) {
      cy.get('[data-testid=job-keywords-input]').type(keywords[keywordIndex]);
      cy.contains('button', keywords[keywordIndex]).click();
      cy.get('[data-testid=job-keywords-input]').clear();
    }

    // Create job posting
    cy.get('[data-testid=new-job-submit]').click();

    // Ensure job posting created with keywords
    cy.get('[data-testid=job-post-title]').contains('Coffin retriever');
    for (let keywordIndex = 0; keywordIndex < 2; keywordIndex++) {
      cy.get('[data-testid=job-post-keywords]').should(
        'contain',
        keywords[keywordIndex]
      );
    }

    // Logout
    cy.logout();
  });

  // User checks notifications -> notified about job posting
  it('ensures user received job notification', () => {
    cy.login(email, pw);

    cy.visit('/notifications');

    cy.get('[data-testid=job-notification]').should(
      'contain',
      'Coffin retriever'
    );

    // TODO click on it and go to job page
  });
});
