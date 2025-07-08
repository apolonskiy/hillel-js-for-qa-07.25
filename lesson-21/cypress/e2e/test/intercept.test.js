import { LandingPage, GaragePage } from "../../support/poms";

const landingPage = new LandingPage()
const garadePage = new GaragePage()

describe('Intercept tests', () => {

  it('Intercept without stubbing' ,() => {
    cy.intercept('POST', '/api/auth/signin').as('signInOne');  
    // cy.intercept({
    //   url: '/api/auth/signin',
    //   method: 'POST'
    // }).as('signInTwo');  
    cy.login()
    cy.wait('@signInOne').then(intercept => {
      expect(intercept.response.body.data.userId).to.eql(163923)
    })
    // cy.wait('@signInTwo').its('response.body.data.userId').should('equal', 163923)
  })

  it('Intercept with stubbing - error sign in' ,() => {
    const errorStaticResponse = {
      statusCode: 401,
      body: {
        status: "error",
        message: "Custom authentication error"
      }
    }

    cy.intercept({
      url: '/api/auth/signin',
      method: 'POST'
    }, errorStaticResponse).as('signInTwo');  
    cy.login()
    landingPage.selectors.loginErrorAlert().should('exist').and('have.text', errorStaticResponse.body.message);
  })

  it('Intercept with routeHandler - remove cookies to fail request' ,() => {
    cy.intercept({
      url: '/api/cars',
      method: 'GET'
    }, (req) => {
      req.headers.cookie = 'invalidCookie=invalid;'
      req.continue((response) => {
        console.log(response)
        expect(response.body.message).to.eql('Not authenticated')
      })
    }).as('invalidGetCars');  
    cy.login()
    cy.wait('@invalidGetCars')
    cy.get('[class="alert alert-danger"] p').should('exist').and('have.text', 'Not authenticated');
    garadePage.selectors.genericCarTile().should('have.length', 0).and('not.exist')
  })

  it('Intercept with routeHandler - replace response via req.reply with simple object' ,() => {
    const mockedCarsData = {
      "status": "ok",
      "data": [
        {
          "id": 98798798789,
          "carBrandId": 2,
          "carModelId": 10,
          "initialMileage": 1111,
          "updatedMileageAt": "2025-07-08T16:47:24.000Z",
          "carCreatedAt": "2025-07-08T16:47:24.000Z",
          "mileage": 1111,
          "brand": "BMW",
          "model": "Z3",
          "logo": "bmw.png"
        },
        {
          "id": 98798798789,
          "carBrandId": 1,
          "carModelId": 4,
          "initialMileage": 1,
          "updatedMileageAt": "2025-07-08T16:47:17.000Z",
          "carCreatedAt": "2025-07-08T16:47:17.000Z",
          "mileage": 1,
          "brand": "Audi",
          "model": "A6",
          "logo": "audi.png"
        },
        {
          "id": 333,
          "carBrandId": 3,
          "carModelId": 13,
          "initialMileage": 1,
          "updatedMileageAt": "2025-07-08T16:47:17.000Z",
          "carCreatedAt": "2025-07-08T16:47:17.000Z",
          "mileage": 1,
          "brand": "Ford",
          "model": "INVALID FUSION",
          "logo": "audi.png"
        }
      ]
    }
      
    cy.intercept({
      url: '/api/cars',
      method: 'GET'
    }, (req) => {
      req.reply(mockedCarsData)
    }).as('invalidGetCars');  
    cy.login()
    cy.wait('@invalidGetCars')
    cy.get('[class="alert alert-danger"] p').should('not.exist')
    garadePage.selectors.genericCarTile().should('have.length', 3)
    mockedCarsData.data.forEach((carData, index) => {
      garadePage.selectors.genericCarTile().eq(index).should('contain.text', carData.brand).should('contain.text', carData.model)
      garadePage.selectors.genericCarTileMileage().eq(index).should('have.value', carData.mileage)
    })
  })

  it('Intercept with routeHandler - replace response via req.reply with fixture' ,() => {
    cy.intercept({
      url: '/api/cars',
      method: 'GET'
    }, (req) => {
      req.reply({
        fixture: 'carDataResponse'
      })
    }).as('invalidGetCars');  
    cy.login()
    cy.wait('@invalidGetCars')
    cy.get('[class="alert alert-danger"] p').should('not.exist')
    garadePage.selectors.genericCarTile().should('have.length', 3)
    cy.fixture('carDataResponse').then(mockedCarsData => {
      mockedCarsData.data.forEach((carData, index) => {
        garadePage.selectors.genericCarTile().eq(index).should('contain.text', carData.brand).should('contain.text', carData.model)
        garadePage.selectors.genericCarTileMileage().eq(index).should('have.value', carData.mileage)
      })
    })
  
  })
  
})