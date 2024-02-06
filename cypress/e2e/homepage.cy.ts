describe("Auth0", () => {
  beforeEach(function () {
    cy.login("Auth0");
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
