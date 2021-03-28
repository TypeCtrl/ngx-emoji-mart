/// <reference types="cypress" />

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

describe('@ctrl/ngx-emoji-mart', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('https://api.github.com/repos/scttcper/ngx-emoji-mart', {});
  });

  it('should successfully load the app', () => {
    cy.get('app-root').should('exist');
  });

  it('should show emoji-mart with its child components', () => {
    cy.get('emoji-mart')
      .should('exist')
      .get('emoji-mart-anchors')
      .should('exist')
      .get('emoji-search')
      .should('exist')
      .get('section.emoji-mart-scroll')
      .should('exist');
  });

  it('should show hovered emoji on the preview bar', () => {
    cy.get('ngx-emoji')
      .first()
      .trigger('mouseenter')
      .invoke('text')
      .then(hoveredEmoji => {
        cy.get('emoji-preview span span')
          .invoke('text')
          .then(previewEmoji => {
            expect(hoveredEmoji).to.equal(previewEmoji);
          });
      });
  });

  it('should scroll when anchor is clicked', () => {
    cy.get('emoji-mart-anchors')
      .get('span.emoji-mart-anchor')
      .eq(3)
      .trigger('click')
      .get('section.emoji-mart-scroll')
      .invoke('scrollTop')
      .should('be.greaterThan', 2500);
  });

  it('emoji-mart should become dark', () => {
    cy.get('button').contains('dark').click().get('.emoji-mart-dark').should('exist');
  });
});
