export class CarsApiClient {

  deleteCar(carId) {
    return cy.request({
      url: `/api/cars/${carId}`,
      method: 'DELETE'
    })
  }

}