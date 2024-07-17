describe('Login Tests', () => {
    it('Should login with valid credentials', () => {
      cy.visit('https://www.saucedemo.com');
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
    });
  
    it('Should not login with invalid credentials', () => {
      cy.visit('https://www.saucedemo.com');
      cy.get('#user-name').type('invalid_user');
      cy.get('#password').type('invalid_password');
      cy.get('#login-button').click();
      cy.get('.error-message-container').should('be.visible');
    });
  });
  
  describe('Product Viewing Tests', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com');
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
    });
  
    it('Should display product list after login', () => {
      cy.get('.inventory_item').should('have.length.greaterThan', 0);
    });
  });

  describe('Add to Cart Tests', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com');
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
    });
  
    it('Should add a product to the cart', () => {
      cy.get('.inventory_item').first().find('button').click();
      cy.get('.shopping_cart_badge').should('contain', '1');
    });
  });
  
  describe('Remove from Cart Tests', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com');
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('.inventory_item').first().find('button').click();
    });
  
    it('Should remove a product from the cart', () => {
      cy.get('.shopping_cart_link').click();
      cy.get('.cart_item').first().find('button').click();
      cy.get('.cart_item').should('not.exist');
    });
  });

  describe('Checkout Tests', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com');
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('.inventory_item').first().find('button').click();
      cy.get('.shopping_cart_link').click();
    });
  
    it('Should complete the checkout process', () => {
      cy.get('.checkout_button').click();
      cy.get('#first-name').type('John');
      cy.get('#last-name').type('Doe');
      cy.get('#postal-code').type('12345');
      cy.get('.cart_button').click();
      cy.get('.cart_button').click();
      cy.url().should('include', '/checkout-complete.html');
    });
  });
  
  
  