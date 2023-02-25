describe("given an unauthenticated session", () => {
  before(() => {
    cy.resetDatabase();
  });

  beforeEach(() => {
    cy.loginNextAuth({
      userId: "3abd5c17-7f80-4a3e-8c3e-7a24e0185aea",
      name: "bobby",
      email: "bobby@mcbobby.com",
      provider: "discord",
    });

    cy.visit("/");
  });

  describe("when generating a valid JWT and visiting the site", () => {
    it("should show the home page of an authenticated user", () => {
      cy.findByLabelText("logout-button").should("be.visible");
    });
  });
});

export {};
