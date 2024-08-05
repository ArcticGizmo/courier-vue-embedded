import Inbox from '../../src/components/CourierInboxVue.vue';
import { InboxProps } from '../../src';
import { InitOptions } from '../support/commands';

const init = (props?: InboxProps, opts?: InitOptions) => {
  cy.mount(Inbox, { props });
  cy.initCourier(opts);
};

const getByPartialClass = (name: string) => cy.get(`[class^="${name}"]`);

describe('inbox', () => {
  it('bell renders', () => {
    init();
    cy.get('courier-inbox').should('exist');
  });

  it('can open and close', () => {
    init();
    cy.get('courier-inbox').click();
    cy.get('body').should('contain', 'Notifications');
    cy.get('[title="close inbox"]').click();
    cy.get('body').should('not.contain', 'Notifications');
  });

  it('can have multiple views', () => {
    init({
      views: [
        { id: 'message', label: 'Messages' },
        { id: 'preferences', label: 'Preferences' }
      ]
    });
    // open inbox
    cy.get('courier-inbox').click();
    // open inbox options
    getByPartialClass('Header__DropdownOptionButton').click();
    cy.get('body').should('contain', 'Messages').should('contain', 'Preferences');
  });
});

// TODO: figure out what happens if you change the user id
