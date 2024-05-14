import { socketA, password } from '../fixtures/data.json';

describe('Message Screen', () => {
  it('Send Message successfully', () => {
    cy.visit("http://localhost:5173/");
    cy.get("#login").click();
    cy.wait(500);
    cy.get("#username").type(socketA);
    cy.get("#password").type(password);
    cy.get("button[type='submit']").click();
    cy.wait(500);
    cy.get("#root > div > div.MuiBox-root.css-0 > div > div > ul > li:nth-child(2)").click();
    cy.wait(500);
    cy.get("#root > div > main > div > div.MuiPaper-root.MuiPaper-outlined.MuiPaper-rounded.css-j66crw-MuiPaper-root > div > ul > li:nth-child(6)").click();
    cy.get("#root > div > main > div > div.MuiBox-root.css-18dq3ez > form > div > input").type(`Hello e2e test ${Math.random() * 10000}`);
    cy.wait(500);
    cy.get("#root > div > main > div > div.MuiBox-root.css-18dq3ez > form > button").click();
    cy.wait(500);
  })
})