import { Providers } from "./commands";

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      login(provider: Providers): Chainable<JQuery<HTMLElement>>;

      logout(): Chainable<JQuery<HTMLElement>>;

      disableSameSiteCookieRestrictions(): void;
    }
  }
}
