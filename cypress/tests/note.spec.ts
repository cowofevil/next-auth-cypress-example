import { testCreds } from "../support/testData";

describe("given that several notes and tags already exist", () => {
  before(() => {
    cy.resetSeedDatabase();
  });

  beforeEach(() => {
    cy.loginNextAuth(testCreds);

    cy.visit("/");
  });

  describe("when a user visits the home page", () => {
    it("should show all available notes as cards containing tag information", () => {
      cy.findAllByLabelText("note-card")
        .should("have.length", 6)
        .each(($el, index) => {
          expect($el).to.contain(`Note${index + 1}`);
          expect($el).to.contain(`Tag${index + 1}`);
        });
    });
  });

  describe("when a user searches by exact title", () => {
    it("should only show one card", () => {
      cy.findByLabelText("search-by-title-input").type("Note1");

      cy.findAllByLabelText("note-card")
        .should("have.length", 1)
        .each(($el, index) => {
          expect($el).to.contain(`Note${index + 1}`);
          expect($el).to.contain(`Tag${index + 1}`);
        });
    });
  });

  describe("when a user searches by a single tag with a single note association", () => {
    it("should only show one card", () => {
      cy.findByLabelText("search-by-tag-dropdown")
        .click()
        .then(($el) => {
          cy.get(`[id="${$el.attr("aria-owns")}"]`).within(() => {
            cy.findByText("Tag1").click();
          });
        });

      cy.findAllByLabelText("note-card")
        .should("have.length", 1)
        .each(($el, index) => {
          expect($el).to.contain(`Note${index + 1}`);
          expect($el).to.contain(`Tag${index + 1}`);
        });
    });
  });

  describe("when a user deletes a note", () => {
    after(() => {
      cy.resetSeedDatabase();
    });

    it("should show all REMAINING notes on the home page", () => {
      cy.findByText("Note6").click();

      cy.findByLabelText("delete-button").click();

      cy.findAllByLabelText("note-card")
        .should("have.length", 5)
        .each(($el, index) => {
          expect($el).to.contain(`Note${index + 1}`);
          expect($el).to.contain(`Tag${index + 1}`);
        });
    });
  });

  describe("when a user deletes a note and then searches by the exact title of the note", () => {
    after(() => {
      cy.resetSeedDatabase();
    });

    it("should not show any notes", () => {
      cy.findByText("Note6").click();

      cy.findByLabelText("delete-button").click();

      cy.findByLabelText("search-by-title-input").type("Note6");

      cy.findAllByLabelText("note-card").should("have.length", 0);
    });
  });
});

describe("given that there are NO existing notes", () => {
  beforeEach(() => {
    cy.loginNextAuth(testCreds);
  });

  describe("when a user creates a new note WITHOUT a tag association", () => {
    const noteTitle = "Exquisite Dead Guy";
    const noteBody = "Prosthetic forehead on your real head";

    beforeEach(() => {
      cy.resetDatabase();

      cy.visit("/");

      cy.findByLabelText("create-note-button").click();

      cy.findByLabelText("note-title-input").type(noteTitle);
      cy.findByLabelText("note-body-input").type(noteBody);

      cy.findByLabelText("save-button").click();
    });

    it("should show the new note on the home page", () => {
      cy.findAllByLabelText("note-card")
        .should("have.length", 1)
        .each(($el) => {
          expect($el).to.contain(noteTitle);
        });
    });

    it("should allow the user to open the note in detail view", () => {
      cy.findByLabelText("note-card").click();

      cy.findByText(noteTitle).should("be.visible");
      cy.findByText(noteBody).should("be.visible");
    });

    it("should allow the user to edit the note", () => {
      const newNoteTitle = "A birdhouse in my soul";
      const newNoteBody = "Mr. universe man";

      cy.findByLabelText("note-card").click();

      cy.findByLabelText("edit-button").click();

      cy.findByLabelText("note-title-input").clear().type(newNoteTitle);
      cy.findByLabelText("note-body-input").clear().type(newNoteBody);

      cy.findByLabelText("save-button").click();

      cy.findAllByLabelText("note-card").should("have.length", 1);

      cy.findByText(newNoteTitle).click();

      cy.findByText(newNoteTitle).should("be.visible");
      cy.findByText(newNoteBody).should("be.visible");
    });
  });
});
