// Define the base URL for the tests
const baseUrl = 'https://www.saucedemo.com';
const validUsername = 'standard_user';
const validPassword = 'secret_sauce';
const invalidUsername = 'invalid_user';
const invalidPassword = 'invalid_password';

// Define CSS selectors
const usernameField = '#user-name';
const passwordField = '#password';
const loginButton = '#login-button';
const errorMessageContainer = '.error-message-container';
const inventoryItems = '.inventory_item';
const cartBadge = '.shopping_cart_badge';
const cartLink = '.shopping_cart_link';
const checkoutButton = '.checkout_button';
const firstNameField = '#first-name';
const lastNameField = '#last-name';
const postalCodeField = '#postal-code';
const cartItem = '.cart_item';

describe('Login Tests', () => {
  // Test for successful login with valid credentials
  it('Should login with valid credentials', () => {
    cy.visit(baseUrl); // Visit the base URL
    cy.get(usernameField).type(validUsername); // Type the valid username
    cy.get(passwordField).type(validPassword); // Type the valid password
    cy.get(loginButton).click(); // Click the login button
    cy.url().should('include', '/inventory.html'); // Assert that the URL includes '/inventory.html'
  });

  // Test for unsuccessful login with invalid credentials
  it('Should not login with invalid credentials', () => {
    cy.visit(baseUrl); // Visit the base URL
    cy.get(usernameField).type(invalidUsername); // Type an invalid username
    cy.get(passwordField).type(invalidPassword); // Type an invalid password
    cy.get(loginButton).click(); // Click the login button
    cy.get(errorMessageContainer).should('be.visible'); // Assert that the error message is visible
  });
});

// Describe block for product viewing tests
describe('Product Viewing Tests', () => {
  // Hook to run before each test in this block
  beforeEach(() => {
    cy.visit(baseUrl); // Visit the base URL
    cy.get(usernameField).type(validUsername); // Type the valid username
    cy.get(passwordField).type(validPassword); // Type the valid password
    cy.get(loginButton).click(); // Click the login button
  });

  // Test to check if the product list is displayed after login
  it('Should display product list after login', () => {
    cy.get(inventoryItems).should('have.length.greaterThan', 0); // Assert that there is at least one product item
  });
});

// Describe block for add to cart tests
describe('Add to Cart Tests', () => {
  // Hook to run before each test in this block
  beforeEach(() => {
    cy.visit(baseUrl); // Visit the base URL
    cy.get(usernameField).type(validUsername); // Type the valid username
    cy.get(passwordField).type(validPassword); // Type the valid password
    cy.get(loginButton).click(); // Click the login button
  });

  // Test to check if a product can be added to the cart
  it('Should add a product to the cart', () => {
    cy.get(inventoryItems).first().find('button').click(); // Click the first product's 'Add to cart' button
    cy.get(cartBadge).should('contain', '1'); // Assert that the cart badge contains '1'
  });
});

// Describe block for remove from cart tests
describe('Remove from Cart Tests', () => {
  // Hook to run before each test in this block
  beforeEach(() => {
    cy.visit(baseUrl); // Visit the base URL
    cy.get(usernameField).type(validUsername); // Type the valid username
    cy.get(passwordField).type(validPassword); // Type the valid password
    cy.get(loginButton).click(); // Click the login button
    cy.get(inventoryItems).first().find('button').click(); // Add a product to the cart
  });

  // Test to check if a product can be removed from the cart
  it('Should remove a product from the cart', () => {
    cy.get(cartLink).click(); // Click the cart link
    cy.get(cartItem).first().find('button').click(); // Click the 'Remove' button for the first cart item
    cy.get(cartItem).should('not.exist'); // Assert that the cart item no longer exists
  });
});

// Describe block for checkout tests
describe('Checkout Tests', () => {
  // Hook to run before each test in this block
  beforeEach(() => {
    cy.visit(baseUrl); // Visit the base URL
    cy.get(usernameField).type(validUsername); // Type the valid username
    cy.get(passwordField).type(validPassword); // Type the valid password
    cy.get(loginButton).click(); // Click the login button
    cy.get(inventoryItems).first().find('button').click(); // Add a product to the cart
    cy.get(cartLink).click(); // Click the cart link
  });

  // Test to check if the checkout process completes successfully
  it('Should complete the checkout process', () => {
    cy.get(checkoutButton).should('be.visible').click(); // Ensure the checkout button is visible before clicking
    cy.get(firstNameField).type('John'); // Type the first name
    cy.get(lastNameField).type('Doe'); // Type the last name
    cy.get(postalCodeField).type('12345'); // Type the postal code
    cy.get(checkoutButton).should('be.visible').click(); // Ensure the continue button is visible before clicking
    cy.get(checkoutButton).should('be.visible').click(); // Ensure the finish button is visible before clicking
    cy.url().should('include', '/checkout-complete.html'); // Assert that the URL includes '/checkout-complete.html'
  });
});
