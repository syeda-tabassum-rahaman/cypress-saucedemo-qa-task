describe("Smoke test Login", () => {
  it("allows a standard user to log in and reach the inventory page", () => {
    cy.login();

    cy.url().should("include", "/inventory.html");
    cy.get('[data-test="title"]').should("have.text", "Products");
  });
});
