describe("company dashboard", () => {
  // Test Case: Not Logged In
  context("not logged in", () => {
    it("should redirect to /login", () => {
      cy.visit("/e/dash");
      cy.url().should("include", "/auth");
    });
  });

  // Test Case: Logged in as Talent User
  context("logged in as talent", () => {
    it("should be redirected from /e/dash to login page", () => {
      cy.login("Auth0Talent");

      cy.visit("/e/dash");

      // Assert: redirected to homepage (it redirects to login page, but since we're already logged in, it redirects to homepage)
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });

  // Test Case: Logged in as Company User
  // context("logged in as company", () => {
  //   it("Company user should be redirected from /t/dash to /e/dash", () => {
  //     cy.login("Auth0Company");
  //
  //     cy.visit("/t/dash");
  //     cy.url().should("include", "/e/dash");
  //   });
  // });
});
