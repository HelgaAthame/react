describe('My first react App e2e tests', () => {
  it('opens nav links', () => {
    cy.visit('/');
    cy.contains('ABOUT US').click();
    cy.contains('FORM').click();
    cy.contains('BEST BOOK STORE').click();
  });
  it('modal window works', () => {
    cy.visit('/');
    cy.contains('Melkor').click();
    cy.contains('Beleriand');
    cy.get('.close').click();
  });
  it('search works', () => {
  })
});
