describe("job applications page", () => {
  // Test Case: Not Logged In. TODO: Write function to get a working application id
  // context("not logged in", () => {
  //   it("should redirect to /login", () => {
  //     cy.visit("/applications/1");
  //     cy.url().should("include", "/auth");
  //   });
  // });
  // Test Case: Logged in as Talent User. TODO: Write function to get a working application id
  // context("logged in as talent", () => {
  //   it("should be redirected from /e/dash to homepage", () => {
  //     cy.login("Auth0Talent");
  //
  //     cy.visit("/applications/1");
  //
  //     cy.url().should("eq", Cypress.config().baseUrl + "/");
  //   });
  // });
  // TODO: Test a company user that is not authorized to view the application
  // TODO: Test a company user that is authorized to view the application
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
