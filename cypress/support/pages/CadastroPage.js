class CadastroPage {
  visit() {
    cy.visit('/cadastrarusuarios');
  }

  fillNome(nome) {
    cy.get('[data-testid="nome"]').clear().type(nome);
    return this;
  }

  fillEmail(email) {
    cy.get('[data-testid="email"]').clear().type(email);
    return this;
  }

  fillPassword(password) {
    cy.get('[data-testid="password"]').clear().type(password);
    return this;
  }

  checkAdministrador() {
    cy.get('[data-testid="checkbox"]').check();
    return this;
  }

  clickCadastrar() {
    cy.get('[data-testid="cadastrar"]').click();
    return this;
  }

  cadastrarUsuario(user, isAdmin = false) {
    this.fillNome(user.nome);
    this.fillEmail(user.email);
    this.fillPassword(user.password);
    if (isAdmin) {
      this.checkAdministrador();
    }
    this.clickCadastrar();
    return this;
  }

  assertCadastroSucesso() {
    cy.get('.alert-dismissible').should('be.visible');
    cy.contains('Cadastro realizado com sucesso').should('be.visible');
  }
}

export default new CadastroPage();
