class InventoryPage {
  selectors = {
    title:        '[data-test="title"]',
    sortDropdown: '[data-test="product-sort-container"]',
    itemPrice:    '[data-test="inventory-item-price"]',
    addToCart:    '[data-test^="add-to-cart"]',
    cartLink:     '[data-test="shopping-cart-link"]',
  };

  sortBy(option) {
    cy.get(this.selectors.sortDropdown).select(option);
    return this;
  }

  prices() {
    return cy.get(this.selectors.itemPrice);
  }

  addItemByIndex(index) {
    cy.get(this.selectors.addToCart).eq(index).click();
    return this;
  }

  goToCart() {
    cy.get(this.selectors.cartLink).click();
    return this;
  }
}

export default new InventoryPage();
