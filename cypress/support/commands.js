// Generates unique user data to avoid collisions on the shared environment
Cypress.Commands.add('generateUser', (overrides = {}) => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return {
    nome: `QA Tester ${timestamp}`,
    email: `qa.tester.${timestamp}.${random}@teste.com`,
    password: 'teste123',
    administrador: 'false',
    ...overrides
  };
});

//Creates a user via API and return the created user data + id
Cypress.Commands.add('createUserViaApi', (overrides = {}) => {
  return cy.generateUser(overrides).then((user) => {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: user,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      return {
        ...user,
        _id: response.body._id,
        message: response.body.message
      };
    });
  });
});

//Performs login via API and return the full response
Cypress.Commands.add('loginViaApi', (email, password) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/login`,
    body: { email, password },
    failOnStatusCode: false
  });
});

//Creates an admin user via API and return user + token
Cypress.Commands.add('createAdminAndGetToken', () => {
  return cy.createUserViaApi({ administrador: 'true' }).then((admin) => {
    return cy.loginViaApi(admin.email, admin.password).then((loginRes) => {
      expect(loginRes.status).to.eq(200);
      return {
        user: admin,
        token: loginRes.body.authorization
      };
    });
  });
});
