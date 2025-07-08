export class GaragePage {
  // Approach 1
  selectors = {
    addCarButton: () => cy.contains('app-garage button', 'Add car'),
    genericCarTile: () => cy.get('ul[class="car-list"] li'),
    genericCarTileMileage: () =>  cy.get('ul[class="car-list"] li input'),

  }

  clickSignInButton(){
    this.signInButton.click()
    return this;
  }
}