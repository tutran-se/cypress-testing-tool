describe("Authentication Flow", () => {
  before(() => {
    // visit the home page
    cy.visit("http://localhost:3000");
    // click on the "Authentication Flow"
    cy.get("#authentication").click();
    cy.wait(500);
  });

  it("the page heading should be 'Join Our Team' and button should be 'Register'", () => {
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
  it("redirect to Login page after succesfully register", () => {
    cy.get('input[type="email"]').clear().type("test@gmail.com");
    cy.get('input[type="password"]').clear().type("@Password123");
    cy.get("button").click();
    cy.wait(500);
    cy.get("h1").contains("Welcome back");
    cy.get("button").contains("Login");
  });

  it("show error 'Email is required' if email input is empty", () => {
    cy.get("button").click();
    cy.get("#errorMessage").contains("Email is required");
    cy.get('input[type="email"]').focus();
  });
  it("show error 'Password is required' if password input is empty", () => {
    cy.get('input[type="email"]').type("test@gmail.com");
    cy.get("button").click();
    cy.get("#errorMessage").contains("Password is required");
    cy.get('input[type="password"]').focus();
  });
  it("show error 'Invalid email' if email is not test@gmail.com", () => {
    cy.get('input[type="email"]').clear().type("invalid@gmail.com");
    cy.get('input[type="password"]').type("@Password123");
    cy.get("button").click();
    cy.get("#errorMessage").contains("Invalid email");
  });
  it("show error 'Invalid password' if password is @Password123", () => {
    cy.get('input[type="email"]').clear().type("test@gmail.com");
    cy.get('input[type="password"]').clear().type("IncorrectPassword");
    cy.get("button").click();
    cy.get("#errorMessage").contains("Invalid password");
  });
  it("redirect to Dashboard page if login successfully", () => {
    cy.get('input[type="email"]').clear().type("test@gmail.com");
    cy.get('input[type="password"]').clear().type("@Password123");
    cy.get("button").click();
    cy.wait(500);
    cy.get("h1").contains("DashBoard");
    cy.get("p").contains("test@gmail.com");
  });
});
