import { click } from "@testing-library/user-event/dist/click";
import { DELAY_IN_MS } from "../../src/constants/delays";
import { DEFAULT_COLOR, CHANGING_COLOR, MODIFIED_COLOR } from '../constants';


describe('Проверка корректной визуализации алгоритма разворота строки', () => {
  beforeEach(() => {    
    cy.visit('/recursion');
  });

  it('Eсли в поле ввода пусто, то кнопка добавления недоступна', function () {
    cy.get('input').should('have.value', '');
    cy.contains('Развернуть').should('be.disabled');
  });

  it('Корректная отработка алгоритма разворота строки', () =>{
    cy.clock();
    cy.get('input').type("tests").should('have.value', 'tests');
    cy.contains('Развернуть').should("not.be.disabled").click();

    cy.get('[class*=circle_circle]').as("circle").should('have.length', 5);
    cy.get("@circle").eq(0).should("have.css", "border", CHANGING_COLOR).contains('t');
    cy.get("@circle").eq(1).should("have.css", "border", DEFAULT_COLOR).contains('e');
    cy.get("@circle").eq(2).should("have.css", "border", DEFAULT_COLOR).contains('s');
    cy.get("@circle").eq(3).should("have.css", "border", DEFAULT_COLOR).contains('t');
    cy.get("@circle").eq(4).should("have.css", "border", CHANGING_COLOR).contains('s');
    cy.tick(DELAY_IN_MS);
    cy.get("@circle").eq(0).should("have.css", "border", MODIFIED_COLOR).contains('s');
    cy.get("@circle").eq(1).should("have.css", "border", CHANGING_COLOR).contains('e');
    cy.get("@circle").eq(2).should("have.css", "border", DEFAULT_COLOR).contains('s');
    cy.get("@circle").eq(3).should("have.css", "border", CHANGING_COLOR).contains('t');
    cy.get("@circle").eq(4).should("have.css", "border", MODIFIED_COLOR).contains('t');
    cy.tick(DELAY_IN_MS);
    cy.get("@circle").eq(0).should("have.css", "border", MODIFIED_COLOR).contains('s');
    cy.get("@circle").eq(1).should("have.css", "border", MODIFIED_COLOR).contains('t');
    cy.get("@circle").eq(2).should("have.css", "border", MODIFIED_COLOR).contains('s');
    cy.get("@circle").eq(3).should("have.css", "border", MODIFIED_COLOR).contains('e');
    cy.get("@circle").eq(4).should("have.css", "border", MODIFIED_COLOR).contains('t');
    cy.get('input').clear();
    cy.contains('Развернуть').should("be.disabled");
  }); 
});
