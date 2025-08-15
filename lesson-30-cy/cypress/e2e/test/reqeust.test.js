import { CarsApiClient } from "../../api-clients";
import { LandingPage, GaragePage } from "../../support/poms";

const landingPage = new LandingPage()
const garadePage = new GaragePage()
const carApiClient = new CarsApiClient()

const generatePostCarPaylod = (carBrandId, carModelId, mileage) => ({
  carBrandId,
  carModelId,
  mileage,
})

describe('Request tests', () => {

  after(() => {
    cy.request({
      url: '/api/cars',
      method: 'GET'
    }).then(response => {
      response.body.data.forEach(carData => {
        carApiClient.deleteCar(carData.id).then(response => {
          expect(response.body.data.carId).to.eql(carData.id)
        }) 
      })
    })
  })

  beforeEach(() => {
    cy.api({
      url: '/api/auth/signin',
      method: 'POST',
      body: {
        email: Cypress.env('DEFAULT_USER_NAME'),
        password: Cypress.env('DEFAULT_USER_PASSWORD'),
        remember: false,
      }
    }).then(response => {
      expect(response.body.data.userId).to.eql(Cypress.env('DEFAULT_USER_ID'))
    })
  
    cy.request({
      url: '/api/cars',
      method: 'POST',
      body: generatePostCarPaylod(4,16,35)
    }).then(response => {
      console.log(response)
      expect(JSON.parse(response.requestBody)).to.deep.include(generatePostCarPaylod(4,16,35))
      expect(response.status).to.eql(201)
      cy.wrap(response.body.data.id).as('createdCarId');
    })
  })  

  afterEach(() => {
    cy.get('@createdCarId').then(carId => {
      carApiClient.deleteCar(carId).then(response => {
        expect(response.body.data.carId).to.eql(carId)
      }) 
    })
  })

  it('Sign in via rquest and create car via request, add cookies to browser and check the car presence' ,() => {
    cy.wait(1000);
    cy.visit('')
    garadePage.selectors.genericCarTile().should('have.length', 1)
    cy.wait(1000);
  })

  
})