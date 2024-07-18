// Define variables for URLs, selectors, and credentials
const baseUrl = 'https://www.saucedemo.com';
const validUsername = 'standard_user';
const validPassword = 'secret_sauce';
const invalidUsername = 'invalid_user';
const invalidPassword = 'invalid_password';

const userNameSelector = '#user-name';
const passwordSelector = '#password';
const loginButtonSelector = '#login-button';
const errorSelector = '.error-message-container';
const productListSelector = '.inventory_item';
const cartBadgeSelector = '.shopping_cart_badge';
const cartLinkSelector = '.shopping_cart_link';
const cartItemSelector = '.cart_item';
const checkoutButtonSelector = '.checkout_button';
const firstNameSelector = '#first-name';
const lastNameSelector = '#last-name';
const postalCodeSelector = '#postal-code';
const checkoutCompleteUrl = '/checkout-complete.html';
const inventoryPageUrl = '/inventory.html';

describe('Login Tests', () => {
    it('Should login with valid credentials', () => {
        cy.visit(baseUrl);
        cy.get(userNameSelector).type(validUsername);
        cy.get(passwordSelector).type(validPassword);
        cy.get(loginButtonSelector).click();
        cy.url().should('include', inventoryPageUrl);
    });

    it('Should not login with invalid credentials', () => {
        cy.visit(baseUrl);
        cy.get(userNameSelector).type(invalidUsername);
        cy.get(passwordSelector).type(invalidPassword);
        cy.get(loginButtonSelector).click();
        cy.get(errorSelector).should('be.visible');
    });
});

describe('Product Viewing Tests', () => {
    beforeEach(() => {
        cy.visit(baseUrl);
        cy.get(userNameSelector).type(validUsername);
        cy.get(passwordSelector).type(validPassword);
        cy.get(loginButtonSelector).click();
    });

    it('Should display product list after login', () => {
        cy.get(productListSelector).should('have.length.greaterThan', 0);
    });
});

describe('Add to Cart Tests', () => {
    beforeEach(() => {
        cy.visit(baseUrl);
        cy.get(userNameSelector).type(validUsername);
        cy.get(passwordSelector).type(validPassword);
        cy.get(loginButtonSelector).click();
    });

    it('Should add a product to the cart', () => {
        cy.get(productListSelector).first().find('button').click();
        cy.get(cartBadgeSelector).should('contain', '1');
    });
});

describe('Remove from Cart Tests', () => {
    beforeEach(() => {
        cy.visit(baseUrl);
        cy.get(userNameSelector).type(validUsername);
        cy.get(passwordSelector).type(validPassword);
        cy.get(loginButtonSelector).click();
        cy.get(productListSelector).first().find('button').click();
    });

    it('Should remove a product from the cart', () => {
        cy.get(cartLinkSelector).click();
        cy.get(cartItemSelector).first().find('button').click();
        cy.get(cartItemSelector).should('not.exist');
    });
});

describe('Checkout Tests', () => {
    beforeEach(() => {
        cy.visit(baseUrl);
        cy.get(userNameSelector).type(validUsername);
        cy.get(passwordSelector).type(validPassword);
        cy.get(loginButtonSelector).click();
        cy.get(productListSelector).first().find('button').click();
        cy.get(cartLinkSelector).click();
    });

    it('Should complete the checkout process', () => {
        cy.get(checkoutButtonSelector).click();
        cy.get(firstNameSelector).type('John');
        cy.get(lastNameSelector).type('Doe');
        cy.get(postalCodeSelector).type('12345');
        cy.get(checkoutButtonSelector).click();
        cy.get(checkoutButtonSelector).click();
        cy.url().should('include', checkoutCompleteUrl);
    });
});