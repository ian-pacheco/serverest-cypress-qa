class HomePage {
  assertLoggedIn() {
    cy.url().should('include', '/home');
    cy.contains('Serverest Store').should('be.visible');
  }

  assertProdutosListados() {
    cy.get('.card').should('have.length.greaterThan', 0);
  }

  logout() {
    cy.get('[data-testid="logout"]').click();
  }
}

export default new HomePage();
