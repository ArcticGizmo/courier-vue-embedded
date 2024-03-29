/// <reference types="Cypress" />
import TestRunner from '../support/runners/TestRunner.vue';
import { setup } from '../support/setup';

global.process = global.process || {};
global.process.env = global.process.env || {};

describe('inbox', () => {
  beforeEach(() => {
    setup(() => cy.mount(TestRunner, { props: { clientKey: Cypress.env('CLIENT_KEY') } }));
  });

  it('renders', () => {
    cy.get('courier-inbox').get('[role="button"]').click();
    cy.contains('Notifications');
    cy.contains('You’re all caught up');
  });

  it('can be opened programatically', () => {
    // open
    cy.courier(c => c.inbox.open());
    cy.get('div[data-tippy-root]').should('be.visible');

    // close
    cy.courier(c => c.inbox.close());
    cy.get('div[data-tippy-root]').should('not.exist');
  });
});
