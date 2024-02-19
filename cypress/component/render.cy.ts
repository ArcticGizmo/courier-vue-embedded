/// <reference types="Cypress" />
import TestRunner from '../support/runners/TestRunner.vue';
// import { setup } from '../support/setup';

global.process = global.process || {};
global.process.env = global.process.env || {};

it('renders', () => {
  // see: https://on.cypress.io/mounting-vue
  // setup(() => cy.mount(TestRunner, { props: { clientKey: Cypress.env('CLIENT_KEY') } }));

  cy.mount(TestRunner, { props: { clientKey: Cypress.env('CLIENT_KEY') } });

  // cy.mount(TestRunner, { props: { clientKey: Cypress.env('CLIENT_KEY') } });

  // cy.get('courier-inbox')
  //   .get('[role="button"]')
  //   .click();
  // cy.contains('Notifications');
  // cy.contains('You’re all caught up');
});
