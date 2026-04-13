import inventoryPage from "../../support/pages/InventoryPage";
import checkoutPage from "../../support/pages/CheckoutPage";

describe("Regression: Full purchase journey", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.login();
  });

  it("lets a standard user complete a purchase end to end", function () {
    inventoryPage.addItemByIndex(0);
    inventoryPage.goToCart();

    checkoutPage.startCheckout();

    const ship = this.users.shipping;
    checkoutPage.fillShipping(ship.firstName, ship.lastName, ship.postalCode);
    checkoutPage.continue();

    checkoutPage.finish();

    checkoutPage
      .completionMessage()
      .should("be.visible")
      .and("contain.text", "Thank you for your order");
  });
});
