describe('e2e tests', () => {
  it('opens nav links', () => {
    cy.visit('/');
    cy.contains('ABOUT US').click();
    cy.contains('FORM').click();
    cy.contains('BEST BOOK STORE').click();
  });
  it('form fills out correctly', () => {
    cy.visit('/form');
    cy.get('[type="submit"]').click();
    cy.get('[data-testid="firstName"]').type('Name');
    cy.get('[data-testid="lastName"]').type('Surname');
    cy.get('[data-testid="age"]').type('2010-10-10');
    cy.get('[data-testid="age"]').should('not.be.checked');
    cy.get('[data-testid="showMyAge"]').click({force: true});
    cy.get('input[type=file]').selectFile('src/assets/unbounded.ttf', {force: true});
    cy.get('[data-testid="zipCode"]').type('111111');
    cy.get('select').select('Antarctica');
    cy.get('[data-testid="address"]').type('Some address');
    cy.get('[data-testid="city"]').type('City');
    cy.get('[data-testid="email"]').type('email@gmail.com');
    cy.get('[data-testid="phone"]').type('+375 29 111-11-11');
    cy.get('[type="radio"]').first().check();
    cy.get('[type="submit"]').click();

    cy.get('input[type=file]').selectFile('src/assets/photo.jpg', {force: true});

    cy.get('[type="submit"]').click();
  });
  it('modal window works', () => {
    cy.visit('/');
    cy.contains('Melkor').click();
    cy.contains('Beleriand');
    cy.get('[data-testid="close"]').click();
  });
  it('search works', () => {
    cy.visit('/');
    cy.get('[data-testid="search-input"]').type('Elrond{enter}')
    cy.get('[data-testid="search-input"]').should('have.value', 'Elrond');
  });
  it('error page opens', () => {
    cy.visit('/some-fake-url');
    cy.contains('404');
  });
});
