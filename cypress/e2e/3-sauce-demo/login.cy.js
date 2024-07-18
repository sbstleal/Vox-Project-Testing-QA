describe('Login Tests', () => {
    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';
    const invalidUsername = 'invalid_user';
    const invalidPassword = 'invalid_password';
  
    it('should login with valid credentials', () => {
      cy.visit('https://www.saucedemo.com/v1/');
      cy.get('#user-name').type(validUsername);
      cy.get('#password').type(validPassword);
      cy.get('#login-button').click();
  
      // Verifica se o usuário está logado corretamente
      cy.url().should('include', '/inventory.html');
      cy.get('.product_label').should('contain', 'Products');
    });
  
    it('should not login with invalid credentials', () => {
      cy.visit('https://www.saucedemo.com/v1/');
      cy.get('#user-name').type(invalidUsername);
      cy.get('#password').type(invalidPassword);
      cy.get('#login-button').click();
  
      // Verifica se a mensagem de erro é exibida corretamente
      cy.get('[data-test="error"]').should('be.visible');
    });
  });