describe('Login Tests', () => {
    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';
    const invalidUsername = 'invalid_user';
    const invalidPassword = 'invalid_password';
  
    it('should login with valid credentials', () => {
      cy.visit('/');
      cy.get('#user-name').type(validUsername);
      cy.get('#password').type(validPassword);
      cy.get('#login-button').click();
  
      // Check if the user is logged in correctly
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_item').should('be.visible'); // Change the selector to ensure the element exists
    });
  
    it('should not login with invalid credentials', () => {
      cy.visit('/');
      cy.get('#user-name').type(invalidUsername);
      cy.get('#password').type(invalidPassword);
      cy.get('#login-button').click();
  
      // Check if the error message is displayed correctly
      cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service');
    });
  });
  