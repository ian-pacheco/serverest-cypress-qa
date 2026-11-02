import LoginPage from '../../support/pages/LoginPage';
import HomePage from '../../support/pages/HomePage';

describe('E2E - Login', () => {
  let user;

  beforeEach(() => {
    cy.createUserViaApi().then((createdUser) => {
      user = createdUser;
    });
    LoginPage.visit();
  });

  it('Should login successfully and display products on home page', () => {
    LoginPage.login(user.email, user.password);

    HomePage.assertLoggedIn();
    HomePage.assertProdutosListados();
  });

  it('Should display error message when attempting login with invalid credentials', () => {
    LoginPage.login('user.fake@test.com', 'fake_pass1234');

    LoginPage.assertLoginError();
    LoginPage.assertOnLoginPage();
  });
});
