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
    cy.visit('/');
    cy.get('.input').type('Elrond{enter}')
    cy.get('.input').should('have.value', 'Elrond');
  });
  it('error page opens', () => {
    cy.visit('/some-fake-url');
    cy.contains('404');
  });
  it('form fills out correctly', () => {
    cy.visit('/form');
    cy.get('[type="submit"]').click();
    cy.get('#firstName').type('Name');
    cy.get('#lastName').type('Surname');
    cy.get('#age').type('2010-10-10');
    cy.get('#showMyAge').should('not.be.checked');
    cy.get('#showMyAge').click({force: true});
    cy.get('input[type=file]').selectFile('src/assets/unbounded.ttf', {force: true});
    cy.get('#zipCode').type('111111');
    cy.get('select').select('Antarctica');
    cy.get('#address').type('Some address');
    cy.get('#city').type('City');
    cy.get('#email').type('email@gmail.com');
    cy.get('#phone').type('+375 29 111-11-11');
    cy.get('[type="radio"]').first().check();
    cy.get('[type="submit"]').click();

    cy.get('input[type=file]').selectFile('src/assets/photo.jpg', {force: true});

    cy.get('[type="submit"]').click();
  });
});
