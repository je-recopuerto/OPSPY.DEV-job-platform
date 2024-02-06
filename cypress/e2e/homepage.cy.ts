describe("Auth0", () => {
  beforeEach(function () {
    cy.loginToAuth0(
      Cypress.env("auth0_talent_test_username"),
      Cypress.env("auth0_talent_test_password"),
    );
    cy.visit("/");
  });

  it("shows the user profile", function () {
    cy.contains("Profile").click();
    cy.contains("User Profile").should("be.visible");
  });

  it("shows onboarding", function () {
    cy.contains("Jobs, Simplified.").should("be.visible");
  });
});
