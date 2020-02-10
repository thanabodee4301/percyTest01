describe('summit', () => { 
    it('test krub', ()=> {
        cy.server();
        cy.visit('http://localhost:3000/');
        cy.percySnapshot();
        cy.clickSi();
        cy.percySnapshot();
    })
});