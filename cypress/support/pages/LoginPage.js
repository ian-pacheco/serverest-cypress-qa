class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillEmail(email) {
    cy.get('[data-testid="email"]').clear().type(email);
    return this;
  }

  fillPassword(password) {
    cy.get('[data-testid="senha"]').clear().type(password);
    return this;
  }

  clickEntrar() {
    cy.get('[data-testid="entrar"]').click();
    return this;
  }

  clickCadastreSe() {
    cy.get('[data-testid="cadastrar"]').click();
    return this;
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickEntrar();
    return this;
  }

  assertLoginError() {
    cy.get('.alert-dismissible').should('be.visible');
    cy.contains('Email e/ou senha inválidos').should('be.visible');
  }

  assertOnLoginPage() {
    cy.url().should('include', '/login');
    cy.contains('Login').should('be.visible');
  }
}

export default new LoginPage();
