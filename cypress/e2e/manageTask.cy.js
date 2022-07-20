describe("Manage Task Flow", () => {
  before(() => {
    // visit the home page
    cy.visit("http://localhost:3000");

    // click on the "Manage Task Flow"
    cy.get("#task-manage").click();
    cy.wait(200);
  });

  it("the page heading should be 'Manage Task'", () => {
    cy.get("h1").contains("Manage Task");
  });

  it("The initial list should contain 2 items", () => {
    cy.get("div#taskItem").should((item) => {
      expect(item).to.have.length(2);
    });
  });
  it("Add new task then length should be 3", () => {
    cy.get('input[name="task"]').type("Clean the house");
    cy.get('button[type="submit"]').click();

    cy.get("div#taskItem").should((item) => {
      expect(item).to.have.length(3);
    });
  });

  it("Click on a task, it should have class named 'completed'", () => {
    cy.get("p#taskTitle").first().click();
    cy.get("p#taskTitle").first().should("have.class", "completed");
  });

  it("Click on delete button, length should be 2", () => {
    cy.get("button#deleteBtn").first().click();
    cy.get("div#taskItem").should((item) => {
      expect(item).to.have.length(2);
    });
  });
});
