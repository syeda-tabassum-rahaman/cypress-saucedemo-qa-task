import inventoryPage from "../../support/pages/InventoryPage";

describe("Smoke test: Sort by price", () => {
  beforeEach(() => {
    cy.login();
    });

  it("sorts products by price in both directions", () => {
    inventoryPage.sortBy("lohi");
    inventoryPage.prices().first().should("have.text", "$7.99");

    inventoryPage.sortBy("hilo");
    inventoryPage.prices().first().should("have.text", "$49.99");
  });

});
