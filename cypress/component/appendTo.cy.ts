/// <reference types="Cypress" />
import TestAppendTo from '../support/runners/TestAppendTo.vue';
import { setup } from '../support/setup';

it('inbox can append to specified element', () => {
  // see: https://on.cypress.io/mounting-vue
  setup(() => cy.mount(TestAppendTo, { props: { clientKey: Cypress.env('CLIENT_KEY') } }));

  cy.get('courier-inbox').get('[role="button"]').click();
  cy.contains('Notifications');
  cy.contains('You’re all caught up');
});
