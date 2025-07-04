import { LandingPage } from "../../support/poms";

const landingPage = new LandingPage()

describe('Snapshot testing', () => {
  it('Snapshot testing of Landing page, login dialog and Profile page'
    ,() => {
      cy.visit('')
      cy.wait(2000);
      cy.matchImageSnapshot('Landing page');
      landingPage.clickSignInButton()

      cy.wait(2000);
      cy.get('div[class="modal-content"]').matchImageSnapshot('Login dialog')
      landingPage.typeInEmail(Cypress.env('DEFAULT_USER_NAME'))
      landingPage.typeInPassword(Cypress.env('DEFAULT_USER_PASSWORD'));
      landingPage.clickLoginConfirmationButton();

      cy.get('[class="sidebar_btn-group"] a[href="/panel/profile"]').click()
      cy.wait(2000)
      cy.matchImageSnapshot('Profile page');

    })  
})