// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { LandingPage } from "./poms";

Cypress.Commands.overwrite('visit', (originalFn, url, ...args) => {
  originalFn(url, {
    auth: {
      username: 'guest',
      password: 'welcome2qauto'
    },
    ...args
  })
})

// parent approach 1 - simple commands
Cypress.Commands.add('login', {prevSubject: false} ,(username = Cypress.env('DEFAULT_USER_NAME'), password = Cypress.env('DEFAULT_USER_PASSWORD')) => {
  cy.visit('')
  cy.contains('button', 'Sign In').click();
  cy.get('[id="signinEmail"]').type(username);
  cy.get('[id="signinPassword"]').type(password);
  cy.contains('[class="modal-content"] button', 'Login').click();
});

// approach 2 - POM and custom command
Cypress.Commands.add('loginClass', {prevSubject: false} ,(username = Cypress.env('DEFAULT_USER_NAME'), password = Cypress.env('DEFAULT_USER_PASSWORD')) => {
  cy.visit('')
  const landingPage = new LandingPage();
  landingPage.executeLogin(username, password);
});

// child
Cypress.Commands.add(
  'console',
  {
    prevSubject: true, // в даній опції вказано, що попередній об'єкт винен існувати
  },
  (subject, method) => {
    method = method || 'log'
    // логування об'єкту у консоль
    console[method]('The subject is', subject)
    // повернення отриманого об'єкту
    return subject
  }
)