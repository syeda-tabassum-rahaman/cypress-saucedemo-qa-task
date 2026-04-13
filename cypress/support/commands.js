import loginPage from "./pages/LoginPage";

Cypress.Commands.add("login", () => {
  cy.fixture("users").then((users) => {
    loginPage.visit();
    loginPage.loginAs(users.standard);
  });
});
