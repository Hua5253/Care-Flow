import { manager, password } from '../fixtures/data.json';

describe('Resource Screen', () => {
    it('create New Medicine successfully', () => {
        cy.visit("http://localhost:5173");
        cy.get("#login").click();
        cy.wait(500);
        cy.get("#username").type(manager);
        cy.get("#password").type(password);
        cy.get("button[type='submit']").click();
        cy.wait(500);
        cy.get("#resourceScreen > main > div > div > div.MuiTabs-root.css-1jel8em-MuiTabs-root > div > div > button:nth-child(2)").click();
        cy.wait(500);
        cy.get("#resourceScreen > main > div > div > div.MuiBox-root.css-lg4tvs > div > div:nth-child(2) > button").click();
        cy.get("#name").type(`name ${Math.random() * 10000}`);
        cy.get("#quantity").type(Math.random() * 10000);
        cy.get("#usage").type(`usage ${Math.random() * 10000}`);
        cy.get("#packaging").type(`packaging ${Math.random() * 10000}`);
        cy.get("#medical-equipment-category").parent().click().get('ul > li[data-value="Antipyretics"]').click();
        cy.wait(500);
        cy.get("body > div.MuiModal-root.css-79ws1d-MuiModal-root > div.MuiBox-root.css-1s23rre > div.MuiBox-root.css-1krh9bl > button:nth-child(1)").click();

    })
})