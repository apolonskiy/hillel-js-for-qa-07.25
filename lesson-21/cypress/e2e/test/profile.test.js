import { LandingPage } from "../../support/poms";

const landingPage = new LandingPage()

describe('Selectors tests', () => {



  it('Update Pofile image', 
    {
      env: {
        IT_LEVEL_VAR: 'defined in IT'
      }
    }
    ,() => {
      console.log('THIS SI CONSOLE LOG', process.env.BASE_URL, Cypress.env('BASE_URL'))
      cy.task('log', `This does log ${Cypress.env('BASE_URL')} and ${Cypress.env('IT_LEVEL_VAR')}`)
      cy.login()

      const objExample = {user: 'Viktoriia'};
      cy.wrap(objExample).console('error');
      cy.get('[class="sidebar_btn-group"] a[href="/panel/profile"]')
        .console().click().should('be.visible');
      cy.wait(2000);
      cy.contains('button', 'Edit profile').click();
      cy.get('input[id="editProfilePhoto"]').selectFile('./cypress/fixtures/images/profile-image.jpeg');
      cy.get('[class="modal-footer"] button').click();

    })

  it('Update Pofile image - custom command with POM mix', () => {
    cy.loginClass()

    cy.get('[class="sidebar_btn-group"] a[href="/panel/profile"]')
      .console().click().should('be.visible');
    cy.wait(2000);
    cy.contains('button', 'Edit profile').click();
    cy.get('input[id="editProfilePhoto"]').selectFile('./cypress/fixtures/images/profile-image.jpeg');
    cy.get('[class="modal-footer"] button').click();

  })

  it.skip('Update Pofile image - POM only', () => {
    cy.visit('');
    landingPage.executeLogin(Cypress.env('DEFAULT_USER_NAME'), Cypress.env('DEFAULT_USER_PASSWORD'))

    cy.get('[class="sidebar_btn-group"] a[href="/panel/profile"]')
      .console().click().should('be.visible');
    cy.wait(2000);
    cy.contains('button', 'Edit profile').click();
    cy.get('input[id="editProfilePhoto"]').selectFile('./cypress/fixtures/images/profile-image.jpeg');
    cy.get('[class="modal-footer"] button').click();

  })

  it.skip('Update Pofile image - POM only selctor', () => {
    cy.visit('');
    landingPage.executeLoginSelectors('hillel-1@aaa.com', 'testHillel1!')

    cy.get('[class="sidebar_btn-group"] a[href="/panel/profile"]')
      .console().click().should('be.visible');
    cy.wait(2000);
    cy.contains('button', 'Edit profile').click();
    cy.get('input[id="editProfilePhoto"]').selectFile('./cypress/fixtures/images/profile-image.jpeg');
    cy.get('[class="modal-footer"] button').click();

  })
  
})