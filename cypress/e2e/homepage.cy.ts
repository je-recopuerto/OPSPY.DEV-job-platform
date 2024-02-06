describe("Homepage", () => {
  // This runs before each test in the block
  beforeEach(() => {
    cy.visit("/");
  });

  context("logged in as talent", () => {
    it("should stay on /", () => {
      cy.login("Auth0Talent"); // Assuming this is a custom command to handle login
      // No need to visit "/" as beforeEach hook takes care of it
      cy.url().should("equal", Cypress.config().baseUrl + "/");
    });
  });

  // context("logged in as company", () => {
  //   it("should stay on /", () => {
  //     cy.login("Auth0Company"); // Assuming this is a custom command to handle login
  //     // No need to visit "/" as beforeEach hook takes care of it
  //     cy.url().should("equal", Cypress.config().baseUrl + "/");
  //   });
  // });

  it("shows onboarding", function () {
    // The visit to "/" is already handled by beforeEach
    cy.contains("Jobs, Simplified.").should("be.visible");
  });
});
