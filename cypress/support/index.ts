export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      loginToAuth0(
        username: string,
        password: string,
      ): Chainable<JQuery<HTMLElement>>;

      disableSameSiteCookieRestrictions(): void;
    }
  }
}
