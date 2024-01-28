describe("Auth0", () => {
  beforeEach(function () {
    // cy.task("db:seed");
    // cy.intercept("POST", "/graphql").as("createBankAccount");
    cy.loginToAuth0(
      Cypress.env("auth0_test_username"),
      Cypress.env("auth0_test_password"),
    );
    cy.visit("/");
  });

  it("shows onboarding", function () {
    cy.contains("Jobs, Simplified.").should("be.visible");
  });
});
