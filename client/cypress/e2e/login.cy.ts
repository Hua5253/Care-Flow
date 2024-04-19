import { username, password } from '../fixtures/data.json';

describe('Login Screen', () => {
  it('login successfully', () => {
    cy.visit("http://localhost:5173");
    cy.get("#login").click();
    cy.wait(500);
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("button[type='submit']").click();
  })
})