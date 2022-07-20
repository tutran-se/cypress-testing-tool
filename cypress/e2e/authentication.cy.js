describe("Authentication Flow", () => {
  before(() => {
    // visit the home page
    cy.visit("http://localhost:3000");
    // click on the "Authentication Flow"
    cy.get("#authentication").click();
  });

  it("the page heading should be 'Join Our Team' and button should be 'Register'", () => {
    // Expect to see the register page
    cy.get("h1").contains("Join Our Team");
    cy.get("button").contains("Register");
  });
  // Form validation
  it("show error 'Email is required' if email input is empty", () => {
    cy.get("button").click();
    cy.get("#errorMessage").contains("Email is required");
    cy.get('input[type="email"]').focus();
  });
  it("show error 'Password is required' if password input is empty", () => {
    // show error "Password is required" if password input is empty
    cy.get('input[type="email"]').type("test@gmail.com");
    cy.get("button").click();
    cy.get("#errorMessage").contains("Password is required");
    cy.get('input[type="password"]').focus();
  });
  it("show error 'Password must be at least 8 characters' if password less than 8 characters", () => {
    cy.get('input[type="email"]').clear().type("test@gmail.com");
    cy.get('input[type="password"]').type("hello");
    cy.get("button").click();
    cy.get("#errorMessage").contains("Password must be at least 8 characters");
  });

  it("show error 'Password must be less than 16 characters' if password more than 16 characters", () => {
    cy.get('input[type="password"]')
      .clear()
      .type("thispasswordhasmorethan16characters");
    cy.get("button").click();
    cy.get("#errorMessage").contains(
      "Password must be less than 16 characters"
    );
  });
  it("show error 'Password must contain at least one lowercase letter' if password doesn't any include lowercase character", () => {
    cy.get('input[type="password"]').clear().type("12345678");
    cy.get("button").click();
    cy.get("#errorMessage").contains(
      "Password must contain at least one lowercase letter"
    );
  });

  it("show error 'Password must contain at least one uppercase letter' if password doesn't any include uppercase character", () => {
    cy.get('input[type="password"]').clear().type("12345678a");
    cy.get("button").click();
    cy.get("#errorMessage").contains(
      "Password must contain at least one uppercase letter"
    );
  });
  it("show error 'Password must contain at least one number' if password doesn't include any number", () => {
    cy.get('input[type="password"]').clear().type("Password");
    cy.get("button").click();
    cy.get("#errorMessage").contains(
      "Password must contain at least one number"
    );
  });
  it("show error 'Password must contain at least one special character' if password doesn't include any special character", () => {
    cy.get('input[type="password"]').clear().type("Password123");
    cy.get("button").click();
    cy.get("#errorMessage").contains(
      "Password must contain at least one special character"
    );
  });
  it("show error 'Email already exists' if email already exists", () => {
    cy.get('input[type="email"]').clear().type("exist@gmail.com");
    cy.get('input[type="password"]').clear().type("@Password123");
    cy.get("button").click();
    cy.get("#errorMessage").contains("Email already exists");
  });
});

// // show error "Email already exist" if email already exist
