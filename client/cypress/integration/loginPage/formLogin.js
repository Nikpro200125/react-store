describe("First", () => {
  it("Login Page", () => {
    cy.visit("/login");
  });

  it("Try empty login", () => {
    cy.visit("/login");
    cy.get("button").click();
    cy.get("div.error")
      .eq(0)
      .should("have.text", "Поле 'Логин' не должно быть пустым.");
  });

  it("Try empty password", () => {
    cy.visit("/login");
    cy.get("button").click();
    cy.get("div.error")
      .eq(1)
      .should("have.text", "Поле 'Пароль' не должно быть пустым.");
  });

  it("Have only password error", () => {
    cy.visit("/login");
    cy.get("input").eq(0).focus().type("admin");
    cy.get("button").click();
    cy.get("div.error").its("length").should("eq", 1);
  });

  it("Have only password login", () => {
    cy.visit("/login");
    cy.get("input").eq(1).focus().type("admin");
    cy.get("button").click();
    cy.get("div.error").its("length").should("eq", 1);
  });

  it("No errors on filled inputs", () => {
    cy.visit("/login");
    cy.get("input").eq(0).focus().type("admin");
    cy.get("input").eq(1).focus().type("admin");
    cy.get("button").click();
    cy.wait(4000);
    cy.location().its("pathname").should("eq", "/admin");
    cy.getCookie("accessToken")
      .should("have.property", "value")
      .should("not.be.empty");
  });

  it("Invalid login", () => {
    cy.visit("/login");
    cy.get("input").eq(0).focus().type("admin");
    cy.get("input").eq(1).focus().type("notpassword");
    cy.get("button").click();
    cy.wait(4000);
    cy.get("div.error").should(
      "have.text",
      "Неверные данные, попробуйте снова"
    );
  });
});
