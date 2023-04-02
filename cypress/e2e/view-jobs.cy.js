describe('Users can view jobs', () => {
  let email = 'test2+cypress@test.com';
  let pw = '123456';

  before(() => {
    cy.login(email, pw);
  });

  after(() => {
    cy.logout();
  });

  it('user can filter by job type', () => {
    // go to the job feed page
    cy.visit('/job-feed');

    // all jobs load
    cy.get('[data-testid=card]').should('exist');

    // press full time filter
    cy.get('[data-testid=FullTime-check]').click();

    // check if full-time jobs show on page (there are jobs of each type in the database)
    cy.get('[data-testid=full-time-job-display]').should('exist');

    // check if jobs of other types are not there (internship and part time)
    cy.get('[data-testid=part-time-job-display]').should('not.exist');
    cy.get('[data-testid=internship-job-display]').should('not.exist');

    // press part-time filter
    cy.get('[data-testid=PartTime-check]').click();

    // check if full-time AND part-time jobs show on page
    cy.get('[data-testid=full-time-job-display]').should('exist');
    cy.get('[data-testid=part-time-job-display]').should('exist');

    // check if jobs of other types are not there (internship)
    cy.get('[data-testid=internship-job-display]').should('not.exist');

    // press internship filter
    cy.get('[data-testid=Internship-check]').click();

    // check if full-time, part-time AND internship jobs show on page
    cy.get('[data-testid=full-time-job-display]').should('exist');
    cy.get('[data-testid=part-time-job-display]').should('exist');
    cy.get('[data-testid=internship-job-display]').should('exist');

    // uncheck boxes
    cy.get('[data-testid=FullTime-check]').click();
    cy.get('[data-testid=PartTime-check]').click();
    cy.get('[data-testid=Internship-check]').click();
  });

  it('user can filter by search', () => {
    // go to the job feed page
    cy.visit('/job-feed');

    // all jobs load
    cy.get('[data-testid=card]').should('exist');

    // to cover all branches, we need key words that are and are not in an existing:
    //      job title, company name, job skill, job description

    // type a search key that doesn't exist on any of the jobs, then make sure none come up
    let testMessage = '!thisdoesnotexist!';
    cy.get('[data-testid=job-search-bar]').type(testMessage);
    cy.get('[data-testid=card]').should('not.exist');

    // type a search key that exists on all the fields (title, job, description, company)
    testMessage = 'incor';
    cy.get('[data-testid=job-search-bar]').clear();
    cy.get('[data-testid=job-search-bar]').type(testMessage);
    cy.get('[data-testid=card]').should('exist');

    // remove filter
    cy.get('[data-testid=job-search-bar]').clear();
  });

  it('user can apply for a job with documents', () => {
    // go to the job feed page
    cy.visit('/job-feed');

    // all jobs load
    cy.get('[data-testid=card]').should('exist');

    // click apply button
    cy.get('[data-testid=apply-button]').first().click();

    // check if application box pop up
    cy.get('[data-testid=job-application-form]').should('exist');

    // fill in resume text
    cy.get('[data-testid=resume-input]').type('hi');

    // fill in cover letter text
    cy.get('[data-testid=cover-letter-input]').type('hi');

    // put a resume
    cy.get('input[type=file]')
      .first()
      .selectFile({ contents: 'testFile/test.pdf' }, { force: true });

    // put a cover letter
    cy.get('input[type=file]')
      .eq(1)
      .selectFile({ contents: 'testFile/test.pdf' }, { force: true });

    // click apply button
    cy.get('[data-testid=send-application-button]').first().click();

    // quick apply
    cy.get('[data-testid=quick-apply-button]').first().click();

    // quick apply for a job that requires a resume but not cover letter
    cy.get('[data-testid=apply-button]').eq(0).click();
    cy.get('[data-testid=job-application-form]').should('exist');
    cy.get('[data-testid=quick-apply-button]').eq(1).click();

    // quick apply for a job that requires a resume and cover letter
    cy.get('[data-testid=apply-button]').eq(0).click();
    cy.get('[data-testid=job-application-form]').should('exist');
    cy.get('[data-testid=quick-apply-button]').eq(2).click();

    // quick apply for a job that requires a cover letter but not resume
    cy.get('[data-testid=apply-button]').eq(0).click();
    cy.get('[data-testid=job-application-form]').should('exist');
    cy.get('[data-testid=quick-apply-button]').eq(3).click();
  });
});
