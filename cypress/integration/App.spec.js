describe ('Test App', () => {

    it ('launches', () => {
        cy.visit ('/');
    });

    it ('contains complete chores after click', () => {
        cy.visit ('/');
        cy.get('[data-cy=clickMe]').click();
        cy.get('[data-cy=me]').should('contain', 'du');
        // cy.get('[data-cy=AppName]').should('contain', 'ChoreWeek');
        // cy.get('[data-cy=checkbox]').click;
        // cy.get('[data-cy=choreStatus]').should('contain', 'complete');
    });
});
