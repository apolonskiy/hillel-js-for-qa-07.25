export class LandingPage {
  // Approach 1
  selectors = {
    signInButton: () => cy.contains('button', 'Sign In'),
    loginEmailInput: () => cy.get('[id="signinEmail"]'),
    loginPasswordInput: () =>  cy.get('[id="signinPassword"]'),
    loginConfirmationButton: () => cy.contains('[class="modal-content"] button', 'Login'),
    loginErrorAlert: () => cy.get('form p')
  }

  // aproach 2
  get signInButton(){
    return cy.contains('button', 'Sign In')
  }

  loginEmailInput() {
    return cy.get('[id="signinEmail"]')
  }

  loginPasswordInput() {
    return cy.get('[id="signinPassword"]')
  }

  get loginConfirmationButton(){
    return cy.contains('[class="modal-content"] button', 'Login')
  }

  clickSignInButton(){
    this.signInButton.click()
    return this;
  }

  typeInEmail(email){
    this.loginEmailInput().type(email);
    return this;
  }

  typeInPassword(password){
    this.loginPasswordInput().type(password);
    return this
  }

  clickLoginConfirmationButton(){
    this.loginConfirmationButton.click()
    return this;
  }


  executeLogin(email, password){
    // this.clickSignInButton()
    //     .typeInEmail(email)
    //     .typeInPassword(password)
    //     .clickLoginConfirmationButton()
    this.clickSignInButton()
    this.typeInEmail(email)
    this.typeInPassword(password)
    this.clickLoginConfirmationButton()
  }

  executeLoginSelectors(email, password){
    // this.clickSignInButton()
    //     .typeInEmail(email)
    //     .typeInPassword(password)
    //     .clickLoginConfirmationButton()
    this.selectors.signInButton().click()
    this.selectors.loginEmailInput().type(email)
    this.selectors.loginPasswordInput().type(password)
    this.selectors.loginConfirmationButton().click()
  }
}