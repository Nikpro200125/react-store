describe("testing cupcakes", () => {
  it("add cupcake", () => {
    cy.visit("/");
    cy.get(".accordion-button").click({ force: true });
    cy.get("#firstdrop button").click({ force: true });
    cy.get("#firstdrop > .dropMargin > .itemHeight")
      .eq(0)
      .click({ force: true });
    cy.get("#seconddrop button").click({ force: true });
    cy.get("#seconddrop > .dropMargin > .itemHeight")
      .eq(0)
      .click({ force: true });
    cy.get("#thirddrop button").click({ force: true });
    cy.get("#thirddrop > .dropMargin > .itemHeight")
      .eq(0)
      .click({ force: true });
    cy.get(".knopkaZakaza").click({ force: true });
    cy.visit("/cart");
    cy.get(".cartItemDiv").should("have.length", 1);
  });
  it("fail on adding cupcake", () => {
    cy.visit("/");
    cy.get(".accordion-button").click({ force: true });
    cy.get("#firstdrop button").click({ force: true });
    cy.get("#firstdrop > .dropMargin > .itemHeight")
      .eq(0)
      .click({ force: true });
    cy.get("#seconddrop button").click({ force: true });
    cy.get("#seconddrop > .dropMargin > .itemHeight")
      .eq(0)
      .click({ force: true });
    cy.get(".knopkaZakaza").click({ force: true });
    cy.get(".toast-body").should("have.text", "Вы выбрали НЕ все параметры");
  });
});