import { email, pw } from '../support/e2e';

describe('Full edit profile spec', () => {
  cy.on('window:confirm', () => true);

  before(() => {
    cy.login(email, pw);
  });

  after(() => {
    cy.logout();
  });

  it('can edit profile', () => {
    cy.visit('/edit-profile');

    // image
    cy.get('input[type=file]').attachFile('feed/test_image.jpeg'); // new image

    // name
    let newName = 'MY NEW NAME';
    cy.get('[data-testid=name-edit-button]').click();
    cy.get('[data-testid=change-name]').clear().type(newName);

    // bio
    let newBio = 'I want to be the very best like no one ever was.';
    cy.get('[data-testid=bio-edit-button]').click();
    cy.get('[data-testid=bio-editing]').clear().type(newBio);

    // socials
    let socialsGithub = 'github.com/JR-prog';
    let socialsInstagram = 'deadlink.com';

    cy.get('[data-testid=socials-edit-button]').click();

    cy.get('[data-testid=edit-github]').clear().type(socialsGithub);
    cy.get('[data-testid=edit-instagram]').clear().type(socialsInstagram);

    cy.get('[data-testid=save-socials]').click();

    // contact
    let contactEmail = 'contactEmail@test.com';
    let contactPhone = '999-999-9999';

    cy.get('[data-testid=contact-edit-button]').click();

    cy.get('[data-testid=edit-email]').clear().type(contactEmail);
    cy.get('[data-testid=edit-phone]').clear().type(contactPhone);

    cy.get('[data-testid=save-contacts-button]').click();

    // languages
    let newLang1 = 'Klingon';
    let newLang2 = 'Vulkan';

    cy.get('[data-testid=new-lang-input]').type(newLang1);
    cy.get('[data-testid=new-lang-button]').click();

    cy.get('[data-testid=new-lang-input]').type(newLang2);
    cy.get('[data-testid=new-lang-button]').click();

    cy.get('[data-testid=lang-not-hovering-0]')
      .trigger('mouseover')
      .get('[data-testid=lang-hovering-parent-0]')
      .trigger('mouseover')
      .trigger('mouseleave')
      .get('[data-testid=select-proficiency-0]')
      .select('3');

    // coding languages
    let newCodingLang1 = 'C++';
    let newCodingLang2 = 'Assembly';

    cy.get('[data-testid=new-code-lang-input]').type(newCodingLang1);
    cy.get('[data-testid=new-code-lang-button]').click();

    cy.get('[data-testid=new-code-lang-input]').type(newCodingLang2);
    cy.get('[data-testid=new-code-lang-button]').click();

    // education
    let eduProgram = 'Avada Kedavra-ing for Junior Deatheaters';
    let eduSchool = "Hogwarts' basement";
    let eduLocation = 'THE BASEMENT';
    let eduStartdate = '1998-12-31';
    let eduEnddate = '2001-12-31';
    let eduDescription = 'How to kill brats';

    cy.get('[data-testid=add-new-edu]').click();

    cy.get('[data-testid=change-edu-program-0]').type(eduProgram);
    cy.get('[data-testid=change-edu-school-0]').type(eduSchool);
    cy.get('[data-testid=change-edu-location-0]').type(eduLocation);
    cy.get('[data-testid=change-edu-startdate-0]').type(eduStartdate);
    cy.get('[data-testid=change-edu-enddate-0]').type(eduEnddate);
    cy.get('[data-testid=change-edu-description-0]').type(eduDescription);

    cy.get('[data-testid=save-education-0]').click();

    // add second edu with no end date
    cy.get('[data-testid=add-new-edu]').click();

    cy.get('[data-testid=change-edu-program-1]').type(eduProgram);
    cy.get('[data-testid=change-edu-school-1]').type(eduSchool);
    cy.get('[data-testid=change-edu-location-1]').type(eduLocation);
    cy.get('[data-testid=change-edu-startdate-1]').type(eduStartdate);
    cy.get('[data-testid=change-edu-description-1]').type(eduDescription);

    cy.get('[data-testid=save-education-1]').click();

    // course
    let courseTitle = 'Underwater basket weaving VI';
    let courseNumber = '506';
    let courseDesc = 'You know what this is.';

    cy.get('[data-testid=add-course-button]').click();

    cy.get('[data-testid=course-title-0]').type(courseTitle);
    cy.get('[data-testid=course-number-0]').type(courseNumber);
    cy.get('[data-testid=course-desc-0]').type(courseDesc);

    cy.get('[data-testid=save-course-button-0]').click();

    // experience
    let expTitle = 'Sock trader';
    let expLocation = 'Web3';
    let expEmployer = 'Elon Musk';
    let expStartDate = '2020-03-04';
    let expEndDate = '2023-01-23';
    let expDesc =
      'Trading socks on the sock market. What else do you want to know.';

    cy.get('[data-testid=exp-add-button]').click();

    cy.get('[data-testid=edit-exp-title-0]').type(expTitle);
    cy.get('[data-testid=edit-exp-location-0]').type(expLocation);
    cy.get('[data-testid=edit-exp-employer-0]').type(expEmployer);
    cy.get('[data-testid=edit-exp-startDate-0]').type(expStartDate);
    cy.get('[data-testid=edit-exp-endDate-0]').type(expEndDate);
    cy.get('[data-testid=edit-exp-description-0]').type(expDesc);

    cy.get('[data-testid=exp-save-btn-0]').click();

    // add experience with no end date
    cy.get('[data-testid=exp-add-button]').click();

    cy.get('[data-testid=edit-exp-title-1]').type(expTitle);
    cy.get('[data-testid=edit-exp-location-1]').type(expLocation);
    cy.get('[data-testid=edit-exp-employer-1]').type(expEmployer);
    cy.get('[data-testid=edit-exp-startDate-1]').type(expStartDate);
    cy.get('[data-testid=edit-exp-description-1]').type(expDesc);

    cy.get('[data-testid=exp-save-btn-1]').click();

    // projects
    let projTitle = 'Finding Maidens';
    let projCollab = ''; // this is broken as of writing this code
    let projDescription = 'You know what it means.';
    let projStartDate = '1998-07-29';
    let projEndDate = '2023-02-14';
    let projRepo = 'github.com';
    let projDemo = 'interlinked.live';

    cy.get('[data-testid=proj-add-button]').click();

    cy.get('[data-testid=edit-proj-title-0]').type(projTitle);
    cy.get('[data-testid=edit-proj-description-0]').type(projDescription);
    cy.get('[data-testid=edit-proj-startDate-0]').type(projStartDate);
    cy.get('[data-testid=edit-proj-endDate-0]').type(projEndDate);
    cy.get('[data-testid=edit-proj-repoLink-0]').type(projRepo);
    cy.get('[data-testid=edit-proj-demoLink-0]').type(projDemo);

    cy.get('[data-testid=proj-save-button-0]').click();

    // add project with no end date
    cy.get('[data-testid=proj-add-button]').click();

    cy.get('[data-testid=edit-proj-title-1]').type(projTitle);
    cy.get('[data-testid=edit-proj-description-1]').type(projDescription);
    cy.get('[data-testid=edit-proj-startDate-1]').type(projStartDate);
    cy.get('[data-testid=edit-proj-repoLink-1]').type(projRepo);
    cy.get('[data-testid=edit-proj-demoLink-1]').type(projDemo);

    cy.get('[data-testid=proj-save-button-1]').click();

    // skills
    let skill = 'dream walking';
    cy.get('[data-testid=skill-add-button]').click();

    cy.get('[data-testid=skill-input-0]').type(skill);

    cy.get('[data-testid=skill-save-0]').click();

    // awards
    let awdTitle = 'Mirego Prize Winners';
    let awdDate = '2023-01-22';
    let awdDesc = 'Coded for 24 hours nonstop';

    cy.get('[data-testid=awards-add-button]').click();

    cy.get('[data-testid=awards-title-box-0]').type(awdTitle);
    cy.get('[data-testid=awards-date-box-0]').type(awdDate);
    cy.get('[data-testid=awards-desc-box-0]').type(awdDesc);

    cy.get('[data-testid=awards-save-btn-0]').click();

    // certifications
    let certName = 'Certified Gangster';
    let certIssuer = "Diego (Dora's cousin)";
    let certDate = '2000-01-01';
    let certLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    cy.get('[data-testid=certifications-add-button]').click();

    cy.get('[data-testid=certifications-name-box-0]').type(certName);
    cy.get('[data-testid=certifications-issuer-box-0]').type(certIssuer);
    cy.get('[data-testid=certifications-date-box-0]').type(certDate);
    cy.get('[data-testid=certifications-link-box-0]').type(certLink);

    cy.get('[data-testid=certifications-save-btn-0]').click();

    // volunteering experience
    let volTitle = 'Fed the poor';
    let volLocation = 'Country club'; // They're poor in their soul
    let volOrganization = "Dude I don't know";
    let volStartDate = '2000-08-10';
    let volEndDate = '2001-09-11';
    let volDescription = 'Some body once told me';

    cy.get('[data-testid=vol-add-button]').click();

    cy.get('[data-testid=edit-vol-title-0]').type(volTitle);
    cy.get('[data-testid=edit-vol-location-0]').type(volLocation);
    cy.get('[data-testid=edit-vol-organization-0]').type(volOrganization);
    cy.get('[data-testid=edit-vol-startDate-0]').type(volStartDate);
    cy.get('[data-testid=edit-vol-endDate-0]').type(volEndDate);
    cy.get('[data-testid=edit-vol-description-0]').type(volDescription);

    cy.get('[data-testid=vol-save-btn-0]').click();

    // add volunteering with no end date
    cy.get('[data-testid=vol-add-button]').click();

    cy.get('[data-testid=edit-vol-title-1]').type(volTitle);
    cy.get('[data-testid=edit-vol-location-1]').type(volLocation);
    cy.get('[data-testid=edit-vol-organization-1]').type(volOrganization);
    cy.get('[data-testid=edit-vol-startDate-1]').type(volStartDate);
    cy.get('[data-testid=edit-vol-description-1]').type(volDescription);

    cy.get('[data-testid=vol-save-btn-1]').click();

    // update
    cy.get('[data-testid=update-account-button]').click();

    // validate all
    // name
    cy.get('[data-testid=profile-title]').should('contain', newName);

    // bio
    cy.get('[data-testid=profile-bio]').should('contain', newBio);

    // socials
    cy.get(`[data-testid='socials-${socialsInstagram}']`).should(
      'have.attr',
      'href',
      socialsInstagram
    );
    cy.get(`[data-testid='socials-${socialsGithub}']`).should(
      'have.attr',
      'href',
      socialsGithub
    );

    // contact
    cy.get('[data-testid=live-contact]')
      .should('contain', contactEmail)
      .should('contain', contactPhone);

    // languages
    cy.get('[data-testid=live-lang-profile]').should('contain', newLang1);
    cy.get('[data-testid=live-lang-profile]').should('contain', newLang2);

    // coding languages
    cy.get('[data-testid=live-code-langs]').should('contain', newCodingLang1);
    cy.get('[data-testid=live-code-langs]').should('contain', newCodingLang2);

    // education
    cy.get('[data-testid=live-edu-0]')
      .should('contain', eduProgram)
      .should('contain', eduSchool)
      .should('contain', eduLocation)
      .should('contain', '1998')
      .should('contain', '2001')
      .should('contain', eduDescription);

    // courses
    cy.get('[data-testid=live-courses-0]')
      .should('contain', courseTitle)
      .should('contain', courseNumber)
      .should('contain', courseDesc);

    // experience
    cy.get('[data-testid=live-exp-0]')
      .should('contain', expTitle)
      .should('contain', expLocation)
      .should('contain', expEmployer)
      .should('contain', '2020')
      .should('contain', '2023')
      .should('contain', expDesc);

    // projects
    cy.get('[data-testid=live-proj-0]')
      .should('contain', projTitle)
      .should('contain', projDescription)
      .should('contain', '1998')
      .should('contain', '2023');
    cy.get('[data-testid=live-proj-repo-0]').should(
      'have.attr',
      'href',
      projRepo
    );
    cy.get('[data-testid=live-proj-demo-0]').should(
      'have.attr',
      'href',
      projDemo
    );

    // skills
    cy.get('[data-testid=live-skill-0]').should('contain', skill);

    // awards
    cy.get('[data-testid=live-award-0]')
      .should('contain', awdTitle)
      .should('contain', 'January 2023')
      .should('contain', awdDesc);

    // certifications
    cy.get('[data-testid=live-certification-0]')
      .should('contain', certName)
      .should('contain', certIssuer);

    cy.get('[data-testid=live-cert-link-0]').should(
      'have.attr',
      'href',
      certLink
    );

    // volunteering experience
    cy.get('[data-testid=live-vol-0]')
      .should('contain', volTitle)
      .should('contain', volLocation)
      .should('contain', volOrganization)
      .should('contain', volDescription);

    // go back and delet everythin.. with this fuck the coverage??
    cy.visit('/edit-profile');

    // reset image
    cy.get('input[type=file]').attachFile('feed/test_image2.png'); // new image

    // reset name
    let oldName = 'old, boring name';
    cy.get('[data-testid=name-edit-button]').click();
    cy.get('[data-testid=change-name]').clear().type(oldName);
    cy.get('[data-testid=name-edit-button]').click();

    // reset bio
    let oldBio = 'Boring bio';
    cy.get('[data-testid=bio-edit-button]').click();
    cy.get('[data-testid=bio-editing]').clear().type(oldBio);
    cy.get('[data-testid=bio-edit-button]').click();

    // reset socials
    cy.get('[data-testid=socials-edit-button]').click();

    cy.get('[data-testid=edit-github]').clear();
    cy.get('[data-testid=edit-instagram]').clear();

    cy.get('[data-testid=save-socials]').click();

    // reset contact
    cy.get('[data-testid=contact-edit-button]').click();

    cy.get('[data-testid=edit-email]').clear().type('old@contact.com');
    cy.get('[data-testid=edit-phone]').clear();

    cy.get('[data-testid=save-contacts-button]').click();

    // reset languages
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

    // reset coding languages
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

    // reset edu
    cy.get('[data-testid=edit-edu-ext-0]').click();
    cy.get('[data-testid=delete-edu-ext-0]').click();
    cy.get('[data-testid=delete-edu-ext-0]').click();

    // reset courses
    cy.get('[data-testid=edit-course-button-0]').click();
    cy.get('[data-testid=delete-course-button-0]').click();

    // reset experience
    cy.get('[data-testid=exp-edit-btn-0]').click();
    cy.get('[data-testid=exp-delete-btn-0]').click();
    cy.get('[data-testid=exp-delete-btn-0]').click();

    // reset project
    cy.get('[data-testid=proj-edit-button-0]').click();
    cy.get('[data-testid=proj-delete-button-0]').click();
    cy.get('[data-testid=proj-delete-button-0]').click();

    // reset skills
    cy.get('[data-testid=skill-delete-button-0]').click();

    // reset awards
    cy.get('[data-testid=awards-delete-btn-0]').click();

    // reset certifications
    cy.get('[data-testid=certifications-delete-btn-0]').click();

    // reset volunteering
    cy.get('[data-testid=vol-edit-btn-0]').click();
    cy.get('[data-testid=vol-delete-btn-0]').click();
    cy.get('[data-testid=vol-edit-btn-0]').click();
    cy.get('[data-testid=vol-delete-btn-0]').click();

    // Save and logout
    cy.get('[data-testid=update-account-button]').click();

    cy.get('[data-testid=home-interlinked]').should('exist');
    cy.get('[data-testid=profile-info]').should('exist');

    cy.get('[data-testid=live-lang-0]').should('not.exist');
    cy.get('[data-testid=live-coding-lang-0]').should('not.exist');
    cy.get('[data-testid=live-edu-0]').should('not.exist');
    cy.get('[data-testid=live-courses-0]').should('not.exist');
    cy.get('[data-testid=live-exp-0]').should('not.exist');
  });
});
