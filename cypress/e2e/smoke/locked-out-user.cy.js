import loginPage from "../../support/pages/LoginPage";

describe("Smoke test Locked-out user", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
  });

  it("blocks a locked-out user and shows the correct error message", function () {
    loginPage.visit();
    loginPage.loginAs(this.users.lockedOut);

    loginPage
      .errorMessage()
      .should("be.visible")
      .and("contain.text", "locked out");

    cy.url().should("not.include", "/inventory.html");
  });
});
