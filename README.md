# ServeRest - Cypress QA Automation

Suíte de automação de testes desenvolvida com **Cypress + JavaScript** para o teste técnico de Senior QA Tester.

## App`s domain

- **Frontend:** https://front.serverest.dev
- **API (Swagger):** https://serverest.dev

## Scenarios

### E2E (Frontend)

| Spec | Scenario | Type |
|------|----------|------|
| `login.cy.js` | Login success | Positive |
| `login.cy.js` | Login with invalid credentials | Negative |
| `cadastro.cy.js` | User registration (regular + admin) → home → logout | Positive |
| `carrinho.cy.js` | Product search (“pants”) → add to list → add to cart | Positive |
| `carrinho.cy.js` | Product search (inexistent) → not found | Negative |

### API — 3 endpoints

| Spec | Scenario | Type |
|------|----------|------|
| `login.cy.js` | Login com sucesso (retorna token) | Positive |
| `login.cy.js` | Login com senha/email inválido | Negative |
| `usuarios.cy.js` | Cadastro de usuário | Positive |
| `usuarios.cy.js` | Cadastro com email duplicado | Negative |
| `usuarios.cy.js` | Listagem de usuários | Positive |
| `produtos.cy.js` | Listagem de produtos (público) | Positive |
| `produtos.cy.js` | Cadastro de produto sem token | Negative |
| `produtos.cy.js` | Cadastro de produto com token de admin | Positive |

## Estrutura do projeto

```
cypress/
├── e2e/
│   ├── api/                 # Testes de API
│   └── ui/                  # Testes E2E (frontend)
├── support/
│   ├── commands.js          # Custom commands 
│   ├── e2e.js
│   └── pages/               # Page Object Model
│       ├── LoginPage.js
│       ├── CadastroPage.js
│       └── HomePage.js
cypress.config.js
package.json
```

## Pré-requisitos

- Node.js 22
- npm

## How to

```bash
# Install dependencys
npm install

# Open Cy interactive
npm run cy:open

# Run tests headless
npm run cy:run

# Run api tests only
npm run cy:run:api

# run ui tests only
npm run cy:run:ui
```

## Tech

- Cypress 13.x
- JavaScript
- @faker-js/faker

## Notes

- Simple tests and archteture, so no commits were used, impossible in live projects, which must have smaller commits and PR so the team dosen't waste much time on review.
- Tests independant and sustainable.
- All tests are working locally.