describe("login", () => {
  context("with Auth0", () => {
    it("should successfully log into our app", () => {
      cy.login("Auth0");

      // check the user dropdown menu is visible
      cy.get("#test-user-menu").should("exist");
    });
  });
});
