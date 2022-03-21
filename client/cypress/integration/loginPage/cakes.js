describe("Add product to cart", () => {
  it("Add cake", () => {
    cy.visit("/");
    cy.get(".storeItemDescription").eq(0).click({ force: true });
    cy.get(".addItemToCart").click();
    cy.visit("/cart");
    cy.get(".cartItemDiv").should("have.length", 1);
  });
  it("Add many of one cake", () => {
    cy.visit("/");
    cy.get(".storeItemDescription").eq(0).click({ force: true });
    cy.get(".addToCartInput").type("1");
    cy.get(".addItemToCart").click();
    cy.visit("/cart");
    cy.get(".cartItemDiv").should("have.length", 1);
    cy.get(".cartItemAmount").should("have.text", 11);
  });
  it("Add 2 cake", () => {
    cy.visit("/");
    cy.get(".storeItemDescription").eq(0).click({ force: true });
    cy.get(".addItemToCart").click();
    cy.get(".modal-body > .svg-inline--fa > path").click();
    cy.get(".storeItemDescription").eq(1).click({ force: true });
    cy.get(".addItemToCart").click();
    cy.visit("/cart");
    cy.get(".cartItemDiv").should("have.length", 2);
  });
  it("Delete cake from cart", () => {
    cy.visit("/");
    cy.get(".storeItemDescription").eq(0).click({ force: true });
    cy.get(".addItemToCart").click();
    cy.visit("/cart");
    cy.get(".cartItemDiv").should("have.length", 1);
    cy.get(".cartItemDiv > .svg-inline--fa > path").click({ force: true });
    cy.get(".cartItemDiv").should("have.length", 0);
    cy.get(".cart > span").should("have.text", "Товаров пока нет...");
  });

  it("Order cake", () => {
    cy.visit("/");
    cy.get(".storeItemDescription").eq(0).click({ force: true });
    cy.get(".addItemToCart").click();
    cy.visit("/cart");
    cy.get(".cartItemDiv").should("have.length", 1);
    cy.intercept("POST", "/api/order", { fixture: "example.json" });
    cy.get(".btn").click();
    cy.get(".cartItemDiv").should("have.length", 0);
  });
});
