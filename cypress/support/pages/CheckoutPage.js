class CheckoutPage {
  selectors = {
    checkoutButton:  '[data-test="checkout"]',
    firstName:       '[data-test="firstName"]',
    lastName:        '[data-test="lastName"]',
    postalCode:      '[data-test="postalCode"]',
    continueButton:  '[data-test="continue"]',
    finishButton:    '[data-test="finish"]',
    completeHeader:  '[data-test="complete-header"]',
  };

  startCheckout() {
    cy.get(this.selectors.checkoutButton).click();
    return this;
  }

  fillShipping(firstName, lastName, postalCode) {
    cy.get(this.selectors.firstName).type(firstName);
    cy.get(this.selectors.lastName).type(lastName);
    cy.get(this.selectors.postalCode).type(postalCode);
    return this;
  }

  continue() {
    cy.get(this.selectors.continueButton).click();
    return this;
  }

  finish() {
    cy.get(this.selectors.finishButton).click();
    return this;
  }

  completionMessage() {
    return cy.get(this.selectors.completeHeader);
  }
}

export default new CheckoutPage();
