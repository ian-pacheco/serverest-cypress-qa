describe('API - Login', () => {
  let user;

  before(() => {
    cy.createUserViaApi().then((created) => {
      user = created;
    });
  });

  it('Deve realizar login com sucesso e retornar token de autorização', () => {
    cy.loginViaApi(user.email, user.password).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'Login realizado com sucesso');
      expect(response.body).to.have.property('authorization');
      expect(response.body.authorization).to.be.a('string').and.not.be.empty;
    });
  });

  it('Deve retornar erro ao tentar login com senha inválida', () => {
    cy.loginViaApi(user.email, 'senhaerrada').then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Email e/ou senha inválidos');
    });
  });

  it('Deve retornar erro ao tentar login com email inexistente', () => {
    cy.loginViaApi('naoexiste@teste.com', 'qualquer123').then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Email e/ou senha inválidos');
    });
  });
});
