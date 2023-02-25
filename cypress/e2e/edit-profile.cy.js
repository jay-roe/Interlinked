describe('Full edit profile spec', () => {
  let email = 'test2+cypress@test.com';
  let pw = '123456';

  before(() => {
    cy.login(email, pw);
    cy.visit('/edit-profile');

    // Start reset name
    let oldName = 'old, boring name';
    cy.get('[data-testid=name-edit-button]').click();
    cy.get('[data-testid=change-name]').clear().type(oldName);
    cy.get('[data-testid=name-edit-button]').click();
    // End reset name

    // Start reset bio
    let oldBio = 'Boring bio';
    cy.get('[data-testid=bio-edit-button]').click();
    cy.get('[data-testid=bio-editing]').clear().type(oldBio);
    cy.get('[data-testid=bio-edit-button]').click();
    // End reset bio

    // Start reset languages
    cy.get('[data-testid=lang-not-hovering-0]')
      .trigger('mouseover')
      .get('[data-testid=lang-hovering-parent-0]')
      .trigger('mouseover')
      .get('[data-testid=lang-hovering-delete-0]')
      .click();

    cy.get('[data-testid=lang-not-hovering-0]')
      .trigger('mouseover')
      .get('[data-testid=lang-hovering-parent-0]')
      .trigger('mouseover')
      .get('[data-testid=lang-hovering-delete-0]')
      .click();
    // End reset languages

    // Start reset coding languages
    cy.get('[data-testid=code-lang-not-hovering-0]')
      .trigger('mouseover')
      .get('[data-testid=code-lang-hovering-parent-0]')
      .trigger('mouseover')
      .get('[data-testid=code-lang-hovering-delete-0]')
      .click();

    cy.get('[data-testid=code-lang-not-hovering-0]')
      .trigger('mouseover')
      .get('[data-testid=code-lang-hovering-parent-0]')
      .trigger('mouseover')
      .get('[data-testid=code-lang-hovering-delete-0]')
      .click();
    // End reset coding languages

    // Start reset edu
    cy.get('[data-testid=delete-edu-ext-0]').click();
    // End reset edu

    // Start reset courses
    cy.get('[data-testid=delete-course-button-0]').click();
    // End reset courses

    // Start reset experience
    cy.get('[data-testid=exp-delete-btn-0]').click();
    // End reset experience

    // Save and logout
    cy.get('[data-testid=update-account-button]').click();

    cy.on('window:confirm', () => {
      return true;
    });

    cy.intercept('/profile').as('profile');
    cy.wait('@profile');

    cy.logout();

    // Log back in for beginning of tests
    cy.login(email, pw);
  });

  it('can edit profile name', () => {
    cy.visit('/edit-profile');

    let newName = 'MY NEW NAME';
    cy.get('[data-testid=name-edit-button]').click();
    cy.get('[data-testid=change-name]').clear().type(newName);
    cy.get('[data-testid=update-account-button]').click();

    cy.on('window:confirm', () => {
      return true;
    });

    cy.on('window:alert', () => {});

    cy.get('[data-testid=profile-title]').should('contain', newName);
  });

  it('can edit bio', () => {
    cy.visit('/edit-profile');

    let newBio = 'I want to be the very best like no one ever was.';
    cy.get('[data-testid=bio-edit-button]').click();
    cy.get('[data-testid=bio-editing]').clear().type(newBio);
    cy.get('[data-testid=update-account-button]').click();

    cy.on('window:confirm', () => {
      return true;
    });

    cy.on('window:alert', () => {});

    cy.get('[data-testid=profile-bio]').should('contain', newBio);
  });

  it('can edit languages', () => {
    cy.visit('/edit-profile');

    let newLang1 = 'Klingon';
    let newLang2 = 'Vulkan';

    cy.get('[data-testid=new-lang-input').type(newLang1);
    cy.get('[data-testid=new-lang-button').click();

    cy.get('[data-testid=new-lang-input').type(newLang2);
    cy.get('[data-testid=new-lang-button').click();

    cy.get('[data-testid=update-account-button]').click();

    cy.on('window:confirm', () => {
      return true;
    });

    cy.on('window:alert', () => {});

    cy.get('[data-testid=live-lang-profile]').should('contain', newLang1);
    cy.get('[data-testid=live-lang-profile]').should('contain', newLang2);
  });

  it('can edit coding languages', () => {
    cy.visit('/edit-profile');

    let newCodingLang1 = 'C++';
    let newCodingLang2 = 'Assembly';

    cy.get('[data-testid=new-code-lang-input').type(newCodingLang1);
    cy.get('[data-testid=new-code-lang-button').click();

    cy.get('[data-testid=new-code-lang-input').type(newCodingLang2);
    cy.get('[data-testid=new-code-lang-button').click();

    cy.get('[data-testid=update-account-button]').click();

    cy.on('window:confirm', () => {
      return true;
    });

    cy.on('window:alert', () => {});

    cy.get('[data-testid=live-profile]').should('contain', newCodingLang1);
    cy.get('[data-testid=live-profile]').should('contain', newCodingLang2);
  });

  it('can add new education', () => {
    cy.visit('/edit-profile');

    let eduProgram = 'Avada Kedavra-ing for Junior Deatheaters';
    let eduSchool = "Hogwarts' basement";
    let eduLocation = 'THE BASEMENT';
    let eduStartdate = '1998-12-31';
    let eduEnddate = '2001-12-31';
    let eduDescription = 'How to kill brats';

    cy.get('[data-testid=add-new-edu').click();

    cy.get('[data-testid=change-edu-program-0').type(eduProgram);
    cy.get('[data-testid=change-edu-school-0').type(eduSchool);
    cy.get('[data-testid=change-edu-location-0').type(eduLocation);
    cy.get('[data-testid=change-edu-startdate-0').type(eduStartdate);
    cy.get('[data-testid=change-edu-enddate-0').type(eduEnddate);
    cy.get('[data-testid=change-edu-description-0').type(eduDescription);

    cy.get('[data-testid=save-education-0]').click();

    cy.get('[data-testid=update-account-button]').click();

    cy.on('window:confirm', () => {
      return true;
    });

    cy.on('window:alert', () => {});

    cy.get('[data-testid=live-edu-0]')
      .should('contain', eduProgram)
      .should('contain', eduSchool)
      .should('contain', eduLocation)
      .should('contain', '1998')
      .should('contain', '2001')
      .should('contain', eduDescription);
  });

  it('can add new course', () => {
    cy.visit('/edit-profile');

    let courseTitle = 'Underwater basket weaving VI';
    let courseNumber = '506';
    let courseDesc = 'You know what this is.';

    cy.get('[data-testid=add-course-button').click();

    cy.get('[data-testid=course-title-0').type(courseTitle);
    cy.get('[data-testid=course-number-0').type(courseNumber);
    cy.get('[data-testid=course-desc-0').type(courseDesc);

    cy.get('[data-testid=save-course-button-0]').click();

    cy.get('[data-testid=update-account-button]').click();

    cy.on('window:confirm', () => {
      return true;
    });

    cy.on('window:alert', () => {});

    cy.get('[data-testid=live-courses-0]')
      .should('contain', courseTitle)
      .should('contain', courseNumber)
      .should('contain', courseDesc);
  });

  it('can add new experience', () => {
    cy.visit('/edit-profile');

    let expTitle = 'Sock trader';
    let expLocation = 'Web3';
    let expEmployer = 'Elon Musk';
    let expStartDate = '2020-03-04';
    let expEndDate = '2023-01-23';
    let expDesc =
      'Trading socks on the sock market. What else do you want to know.';

    cy.get('[data-testid=exp-add-button').click();

    cy.get('[data-testid=edit-exp-title-0').type(expTitle);
    cy.get('[data-testid=edit-exp-location-0').type(expLocation);
    cy.get('[data-testid=edit-exp-employer-0').type(expEmployer);
    cy.get('[data-testid=edit-exp-startDate-0').type(expStartDate);
    cy.get('[data-testid=edit-exp-endDate-0').type(expEndDate);
    cy.get('[data-testid=edit-exp-description-0').type(expDesc);

    cy.get('[data-testid=exp-save-btn-0]').click();

    cy.get('[data-testid=update-account-button]').click();

    cy.on('window:confirm', () => {
      return true;
    });

    cy.on('window:alert', () => {});

    cy.get('[data-testid=live-exp-0]')
      .should('contain', expTitle)
      .should('contain', expLocation)
      .should('contain', expEmployer)
      .should('contain', '2020')
      .should('contain', '2023')
      .should('contain', expDesc);
  });
});
