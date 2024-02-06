/// <reference types="cypress" />
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

export type Providers = "Auth0Talent" | "Auth0Company";

const providerCredentials = {
  Auth0Talent: {
    username: Cypress.env("auth0_talent_test_username"),
    password: Cypress.env("auth0_talent_test_password"),
  },
  Auth0Company: {
    username: Cypress.env("auth0_company_test_username"),
    password: Cypress.env("auth0_company_test_password"),
  },
};

function loginViaAuth0Ui(provider: Providers) {
  // Ensure we're logged out first
  // remove the two lines below if you need to stay logged in for your remaining tests
  cy.visit("/api/auth/signout");
  cy.get("form").submit();

  // App landing page redirects to Auth0.
  cy.visit("/api/auth/signin");

  // Click the button to login via Auth0.
  cy.get("button", { timeout: 10000 }).contains("Auth0").click();

  // Assert we're on the Auth0 login page.
  cy.url().should("include", "auth0");

  const { username, password } = providerCredentials[provider];

  // Login on Auth0.
  cy.get("input#username").type(username);
  cy.get("input#password").type(password, { log: false });
  cy.contains("button[value=default]", "Continue").click();

  // Ensure Auth0 has redirected us back to the RWA.
  cy.url().should("equal", "http://localhost:3000/");
}

Cypress.Commands.add("login", (provider: Providers) => {
  const log = Cypress.log({
    displayName: "AUTH0 LOGIN",
    message: [`🔐 Authenticating | ${provider}`],
    // @ts-ignore
    autoEnd: false,
  });
  log.snapshot("before");

  // cy.disableSameSiteCookieRestrictions();

  loginViaAuth0Ui(provider);

  log.snapshot("after");
  log.end();
});

Cypress.Commands.add("disableSameSiteCookieRestrictions", () => {
  cy.intercept("*", (req) => {
    req.on("response", (res) => {
      if (!res.headers["set-cookie"]) {
        return;
      }

      const disableSameSite = (headerContent: string): string => {
        return headerContent.replace(
          /samesite=(lax|strict)/gi,
          "samesite=none",
        );
      };

      if (Array.isArray(res.headers["set-cookie"])) {
        res.headers["set-cookie"] =
          res.headers["set-cookie"].map(disableSameSite);
      } else {
        res.headers["set-cookie"] = disableSameSite(res.headers["set-cookie"]);
      }
    });
  });
});

Cypress.Commands.add("logout", () => {
  cy.visit("/api/auth/signout");
  cy.get("form").submit();
});
