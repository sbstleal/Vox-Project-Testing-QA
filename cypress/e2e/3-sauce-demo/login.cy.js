describe('Login Tests', () => {
    it('should login with valid credentials', () => {
        cy.visit('https://www.saucedemo.com/v1/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        // Verifica se o usuário está logado corretamente
        cy.url().should('include', '/inventory.html')
        cy.get('.product_label').should('contain', 'Products')
    })

    it('should not login with invalid credentials', () => {
        cy.visit('https://www.saucedemo.com/v1/')
        cy.get('#user-name').type('invalid_user')
        cy.get('#password').type('invalid_password')
        cy.get('#login-button').click()

        // Verifica se a mensagem de erro é exibida corretamente
        cy.get('[data-test="error"]').should('be.visible')
    })
})
