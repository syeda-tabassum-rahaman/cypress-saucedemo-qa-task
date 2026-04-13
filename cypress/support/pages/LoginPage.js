class LoginPage {
  // page selectors defined in one place
  selectors = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    submit:   '[data-test="login-button"]',
    error:    '[data-test="error"]',
  };

  visit() {
    cy.visit("/");
    return this;
  }

  fillUsername(value) {
    cy.get(this.selectors.username).type(value);
    return this;
  }

  fillPassword(value) {
    cy.get(this.selectors.password).type(value);
    return this;
  }

  submit() {
    cy.get(this.selectors.submit).click();
    return this;
  }

  // perform login with a user object containing username and password
  loginAs(user) {
    this.fillUsername(user.username);
    this.fillPassword(user.password);
    this.submit();
    return this;
  }

  errorMessage() {
    return cy.get(this.selectors.error);
  }
}

export default new LoginPage();
