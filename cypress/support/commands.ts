/// <reference types="cypress" />

import { useCourier } from '../../src';
import { CourierClient } from '../../src/ts/courierClient';

// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

export interface InitOptions {
  clientKey?: string;
  userId?: string;
}

const initCourier = (opts?: InitOptions) => {
  cy.wrap(null).then(async () => {
    const client = useCourier();
    client.init({
      clientKey: opts?.clientKey ?? Cypress.env('VITE_APP_CLIENT_KEY'),
      userId: opts?.userId ?? 'courier-vue-embedded'
    });
  });
};

Cypress.Commands.add('initCourier', initCourier);

declare global {
  namespace Cypress {
    interface Chainable {
      initCourier: typeof initCourier;
    }
  }
}
