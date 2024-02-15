/// <reference types="Cypress" />
import TestRunner from '../support/TestRunner.vue';

// https://github.com/cypress-io/cypress/issues/21434#issuecomment-1146745752
global.process = global.process || {};
global.process.env = global.process.env || {};

describe('<TestRunner />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(TestRunner, { props: { clientKey: Cypress.env("CLIENT_KEY") } });

    // we cache here so that it is faster
    cy.fixture('courier-script.txt').then(resp => {
      // wait for courier script to load
      cy.intercept(
        {
          method: 'GET',
          url: 'https://courier-components-xvdza5.s3.amazonaws.com/v4.5.0.js'
        },
        resp
      ).as('script-load');
      cy.wait('@script-load');
    });

    // wait for client key to init
    cy.intercept({
      method: 'POST',
      url: 'https://**.execute-api.us-east-1.amazonaws.com/**'
    }).as('client-auth');
    cy.wait('@client-auth');

    cy.intercept(
      {
        method: 'POST',
        url: 'https://**.execute-api.us-east-1.amazonaws.com/**'
      },
      resp => {
        console.log(resp.url);
      }
    );

    cy.get('courier-inbox').get('[role="button"]').click();
    cy.contains('Notifications');
    cy.contains('You’re all caught up');
  });
});
