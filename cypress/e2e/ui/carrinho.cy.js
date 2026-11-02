import LoginPage from '../../support/pages/LoginPage';
import HomePage from '../../support/pages/HomePage';

describe('E2E - Busca de Produtos', () => {
  let user;

  beforeEach(() => {
    cy.createUserViaApi().then((createdUser) => {
      user = createdUser;
      LoginPage.visit();
      LoginPage.login(user.email, user.password);
      HomePage.assertLoggedIn();
    });
  });

  it('Should search for a product (pants), add it to the list, and then to the cart', () => {
    const termoBusca = 'pants';

    cy.get('[data-testid="pesquisar"]').clear().type(termoBusca);
    cy.get('[data-testid="botaoPesquisar"]').click();

    cy.get('.card').should('have.length.greaterThan', 0);
    cy.get('.card').should('contain.text', 'Pants');

    cy.get('[data-testid="adicionarNaLista"]').first().click();

    cy.url().should('include', '/minhaListaDeProdutos');
    cy.get('[data-testid="shopping-cart-product-name"]').should('contain.text', 'Pants');

    cy.get('[data-testid="adicionar carrinho"]').click();

    cy.url().should('include', '/carrinho');
  });

  it('Should display message when searching for non-existent product', () => {
    const termoInexistente = `produtoinexistente${Date.now()}`;

    cy.get('[data-testid="pesquisar"]').clear().type(termoInexistente);
    cy.get('[data-testid="botaoPesquisar"]').click();

    // Valida a mensagem de nenhum produto encontrado
    cy.contains('Nenhum produto foi encontrado').should('be.visible');

    // Confirma que não há cards de produto
    cy.get('.card').should('not.exist');
  });
});