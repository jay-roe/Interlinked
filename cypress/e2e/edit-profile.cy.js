describe('Full edit profile spec', () => {
  let email = 'test2+cypress@test.com';
  let pw = '123456';

  before(() => {
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

  after(() => {
    // Start reset name
    cy.visit('/edit-profile');

    let oldName = 'old, boring name';
    cy.get('[data-testid=name-edit-button]').click();
    cy.get('[data-testid=change-name]').clear().type(oldName);
    cy.get('[data-testid=update-account-button]').click();

    cy.on('window:confirm', () => {
      return true;
    });

    cy.on('window:alert', () => {});

    cy.get('[data-testid=profile-title]').should('contain', oldName);
    // End reset name

    // Start reset bio
    cy.visit('/edit-profile');

    let oldBio = 'Boring bio';
    cy.get('[data-testid=bio-edit-button]').click();
    cy.get('[data-testid=bio-editing]').clear().type(oldBio);
    cy.get('[data-testid=update-account-button]').click();

    cy.on('window:confirm', () => {
      return true;
    });

    cy.on('window:alert', () => {});

    cy.get('[data-testid=profile-bio]').should('contain', oldBio);
    // End reset bio

    // Start reset languages
    cy.visit('/edit-profile');
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

    cy.get('[data-testid=update-account-button]').click();

    cy.on('window:confirm', () => {
      return true;
    });

    cy.on('window:alert', () => {});
    // End reset languages

    // Start reset coding languages
    cy.visit('/edit-profile');
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

    cy.get('[data-testid=update-account-button]').click();

    cy.on('window:confirm', () => {
      return true;
    });

    cy.on('window:alert', () => {});
    // End reset coding languages

    // LOGOUT
    cy.logout();
  });
});
