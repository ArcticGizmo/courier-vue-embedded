export const setup = (mounter: () => void) => {
  // https://github.com/cypress-io/cypress/issues/21434#issuecomment-1146745752
  global.process = global.process || {};
  global.process.env = global.process.env || {};

  mounter();
  cy.get('#courier-script', { timeout: 25_000 }).should('exist');

  cy.ensureCourierReady();

  // wait for client key to init
  cy.intercept({
    method: 'POST',
    url: 'https://**.execute-api.us-east-1.amazonaws.com/**'
  }).as('client-auth');
  cy.wait('@client-auth', { timeout: 15_000 });

  // cy.intercept(
  //   {
  //     method: 'POST',
  //     url: 'https://**.execute-api.us-east-1.amazonaws.com/**'
  //   },
  //   resp => {
  //     console.log(resp.url);
  //   }
  // );
};
