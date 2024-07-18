// Import Cypress library
describe('Login Tests', () => {
  // Test for successful login with valid credentials
  it('Should login with valid credentials', () => {
      cy.visit(baseUrl); // Visit the base URL
      cy.get(userNameInput).type(validUsername); // Type valid username
      cy.get(passwordInput).type(validPassword); // Type valid password
      cy.get(loginButton).click(); // Click the login button
      cy.url().should('include', '/inventory.html'); // Verify URL includes inventory page
  });

  // Test for failed login with invalid credentials
  it('Should not login with invalid credentials', () => {
      cy.visit(baseUrl); // Visit the base URL
      cy.get(userNameInput).type(invalidUsername); // Type invalid username
      cy.get(passwordInput).type(invalidPassword); // Type invalid password
      cy.get(loginButton).click(); // Click the login button
      cy.get(errorMessage).should('be.visible'); // Verify error message is visible
  });
});

// Tests for product viewing functionality
describe('Product Viewing Tests', () => {
  beforeEach(() => {
      cy.visit(baseUrl); // Visit the base URL
      cy.get(userNameInput).type(validUsername); // Type valid username
      cy.get(passwordInput).type(validPassword); // Type valid password
      cy.get(loginButton).click(); // Click the login button
  });

  // Test for displaying product list after login
  it('Should display product list after login', () => {
      cy.get(inventoryItems).should('have.length.greaterThan', 0); // Verify product list is displayed
  });
});

// Tests for adding a product to the cart
describe('Add to Cart Tests', () => {
  beforeEach(() => {
      cy.visit(baseUrl); // Visit the base URL
      cy.get(userNameInput).type(validUsername); // Type valid username
      cy.get(passwordInput).type(validPassword); // Type valid password
      cy.get(loginButton).click(); // Click the login button
  });

  // Test for adding a product to the cart
  it('Should add a product to the cart', () => {
      cy.get(inventoryItems).first().find(addToCartButton).click(); // Click the add to cart button for the first item
      cy.get(cartBadge).should('contain', '1'); // Verify cart badge shows one item
  });
});

// Tests for removing a product from the cart
describe('Remove from Cart Tests', () => {
  beforeEach(() => {
      cy.visit(baseUrl); // Visit the base URL
      cy.get(userNameInput).type(validUsername); // Type valid username
      cy.get(passwordInput).type(validPassword); // Type valid password
      cy.get(loginButton).click(); // Click the login button
      cy.get(inventoryItems).first().find(addToCartButton).click(); // Add a product to the cart
  });

  // Test for removing a product from the cart
  it('Should remove a product from the cart', () => {
      cy.get(cartLink).click(); // Click the cart link
      cy.get(cartItems).first().find(removeButton).click(); // Click the remove button for the first item
      cy.get(cartItems).should('not.exist'); // Verify cart item no longer exists
  });
});

// Tests for the checkout process
describe('Checkout Tests', () => {
  beforeEach(() => {
      cy.visit(baseUrl); // Visit the base URL
      cy.get(userNameInput).type(validUsername); // Type valid username
      cy.get(passwordInput).type(validPassword); // Type valid password
      cy.get(loginButton).click(); // Click the login button
      cy.get(inventoryItems).first().find(addToCartButton).click(); // Add a product to the cart
      cy.get(cartLink).click(); // Click the cart link
  });

  // Test for completing the checkout process
  it('Should complete the checkout process', () => {
      cy.get(checkoutButton).click(); // Click the checkout button
      cy.get(firstNameInput).type('John'); // Type first name
      cy.get(lastNameInput).type('Doe'); // Type last name
      cy.get(postalCodeInput).type('12345'); // Type postal code
      cy.get(cartButton).click(); // Click the continue button
      cy.get(cartButton).click(); // Click the finish button
      cy.url().should('include', '/checkout-complete.html'); // Verify URL includes checkout complete page
  });
});