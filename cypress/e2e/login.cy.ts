describe("login", () => {
  // As company
  // it("should successfully log into our app as company", () => {
  //   cy.login("Auth0Company");
  //
  //   // check the user dropdown menu is visible
  //   cy.get("#test-user-menu").should("exist");
  // });

  // As talent
  it("should successfully log into our app as talent", () => {
    cy.login("Auth0Talent");

    // check the user dropdown menu is visible
    cy.get("#test-user-menu").should("exist");
  });
});
