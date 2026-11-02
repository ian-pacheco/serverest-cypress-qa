describe('API - Produtos', () => {
  it('Deve listar produtos cadastrados (endpoint público)', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('quantidade');
      expect(response.body).to.have.property('produtos');
      expect(response.body.produtos).to.be.an('array');
    });
  });

  it('Should return error when attempting to register product without authorization', () => {
    const produto = {
      nome: `Produto Teste ${Date.now()}`,
      preco: 100,
      descricao: 'Descrição de teste',
      quantidade: 10
    };

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      body: produto,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
    });
  });

  it('Should register a product successfully using admin token', () => {
    cy.createAdminAndGetToken().then(({ token }) => {
      const produto = {
        nome: `Produto Admin ${Date.now()}`,
        preco: 250,
        descricao: 'Produto criado por admin via teste automatizado',
        quantidade: 5
      };

      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/produtos`,
        headers: {
          Authorization: token
        },
        body: produto
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');
      });
    });
  });
});
