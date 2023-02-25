import { testCreds } from "../support/testData";

describe("given that several notes and tags already exist", () => {
  beforeEach(() => {
    cy.loginNextAuth(testCreds);

    cy.visit("/");
  });

  describe("when a user associates an additional tag to a note", () => {
    const newTagLabel = "Not Constantinople";

    before(() => {
      cy.resetSeedDatabase();

      cy.loginNextAuth(testCreds);

      cy.visit("/");

      cy.findByText("Note1").click();

      cy.findByLabelText("edit-button").click();

      cy.findByLabelText("select-tags-dropdown").type(`${newTagLabel}{enter}{esc}`, { delay: 50 });
      cy.findByLabelText(`Remove ${newTagLabel}`).should("be.visible");

      cy.findByLabelText("save-button").click();
    });

    it("should show the additional note association on the home page", () => {
      cy.contains("Note1").within(() => {
        cy.findByText("Tag1").should("be.visible");
        cy.findByText(newTagLabel).should("be.visible");
      });
    });

    it("should show the additional note association in the note detail view", () => {
      cy.findByText("Note1").click();

      cy.findByText("Tag1").should("be.visible");
      cy.findByText(newTagLabel).should("be.visible");
    });

    it("should show the additional note association in the note detail view", () => {
      cy.findByText("Note1").click();

      cy.findByText("Tag1").should("be.visible");
      cy.findByText(newTagLabel).should("be.visible");
    });

    it("should allow the note to be searched by either associated tag", () => {
      cy.findByLabelText("search-by-tag-dropdown")
        .click()
        .then(($el) => {
          cy.get(`[id="${$el.attr("aria-owns")}"]`).within(() => {
            cy.findByText("Tag1").click();
          });
        });

      cy.findAllByLabelText("note-card").should("have.length", 1);

      cy.findByLabelText(`Remove Tag1`).click();

      cy.findByLabelText("search-by-tag-dropdown")
        .click()
        .then(($el) => {
          cy.get(`[id="${$el.attr("aria-owns")}"]`).within(() => {
            cy.findByText(newTagLabel).click();
          });
        });

      cy.findAllByLabelText("note-card").should("have.length", 1);
    });
  });

  describe("when a user DELETES a tag", () => {
    before(() => {
      cy.resetSeedDatabase();

      cy.loginNextAuth(testCreds);

      cy.visit("/");

      cy.findByLabelText("edit-tags-button").click();

      cy.findByLabelText("delete-Tag1-tag-button").click();

      cy.findByLabelText("Close").click();
    });

    it("should be ABSENT from the associated note on the home page", () => {
      cy.contains("Note1").within(() => {
        cy.findByText("Tag1").should("not.exist");
      });
    });

    it("should be ABSENT from the associated note in the detail view", () => {
      cy.findByText("Note1").click();

      cy.findByText("Tag1").should("not.exist");
    });
  });
});

describe("given that there are NO existing notes OR tags", () => {
  beforeEach(() => {
    cy.loginNextAuth(testCreds);

    cy.visit("/");
  });

  describe("when a user CREATES a new tag associated with a new note", () => {
    const noteTitle = "Lucky Ball 'n Chain";
    const noteBody = "Istanbul";
    const tagLabel = "Comic Sans";

    before(() => {
      cy.resetDatabase();

      cy.loginNextAuth(testCreds);

      cy.visit("/");

      cy.findByLabelText("create-note-button").click();

      cy.findByLabelText("note-title-input").type(noteTitle);
      cy.findByLabelText("note-body-input").type(noteBody);

      cy.findByLabelText("select-tags-dropdown").type(`${tagLabel}{enter}{esc}`, { delay: 50 });
      cy.findByLabelText(`Remove ${tagLabel}`).should("be.visible");

      cy.findByLabelText("save-button").click();
    });

    it("should show the new note and associated tag on the home page", () => {
      cy.findAllByLabelText("note-card")
        .should("have.length", 1)
        .each(($el) => {
          expect($el).to.contain(noteTitle);
          expect($el).to.contain(tagLabel);
        });
    });

    it("should allow the user to open the note in detail view", () => {
      cy.findByLabelText("note-card").click();

      cy.findByText(noteTitle).should("be.visible");
      cy.findByText(noteBody).should("be.visible");
      cy.findByText(tagLabel).should("be.visible");
    });
  });
});
