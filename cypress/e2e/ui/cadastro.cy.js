import CadastroPage from '../../support/pages/CadastroPage';
import HomePage from '../../support/pages/HomePage';
import LoginPage from '../../support/pages/LoginPage';

describe('E2E - Cadastro de Usuário', () => {
  beforeEach(() => {
    CadastroPage.visit();
  });

  it('Should register a new user successfully, redirect to the home page, and log out', () => {
    cy.generateUser().then((user) => {
      CadastroPage.cadastrarUsuario(user);

      CadastroPage.assertCadastroSucesso();

      // Após cadastro com sucesso, o sistema redireciona para home (usuário já logado)
      cy.url().should('include', '/home');
      HomePage.assertLoggedIn();

      // Realiza logout
      HomePage.logout();
      LoginPage.assertOnLoginPage();
    });
  });
});