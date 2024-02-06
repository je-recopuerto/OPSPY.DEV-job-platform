describe("talent dashboard", () => {
  // Test Case 1: Talent User
  it("Talent user should stay on /t/dash", () => {
    cy.login("Auth0");

    cy.visit("/t/dash");
    cy.url().should("include", "/t/dash");
  });

  // Test Case 2: Company User
  // it("Company user should be redirected from /t/dash to /e/dash", () => {
  //   cy.loginToAuth0(
  //     Cypress.env("auth0_company_test_username"),
  //     Cypress.env("auth0_company_test_password"),
  //   );
  //
  //   cy.visit("/t/dash");
  //   cy.url().should("include", "/e/dash");
  // });
});
