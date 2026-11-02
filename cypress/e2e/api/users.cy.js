describe('API - Usuários', () => {
  it('Deve cadastrar um novo usuário com sucesso', () => {
    cy.generateUser().then((user) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/usuarios`,
        body: user
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');
        expect(response.body._id).to.be.a('string').and.not.be.empty;
      });
    });
  });

  it('Should return error when attempting to register user with existing email', () => {
    cy.createUserViaApi().then((user) => {
      const userPayload = {
        nome: user.nome,
        email: user.email,
        password: user.password,
        administrador: user.administrador
      };

      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/usuarios`,
        body: userPayload,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message', 'Este email já está sendo usado');
      });
    });
  });

  it('Should list registered users', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('quantidade');
      expect(response.body).to.have.property('usuarios');
      expect(response.body.usuarios).to.be.an('array');
      expect(response.body.quantidade).to.be.at.least(1);
    });
  });
});