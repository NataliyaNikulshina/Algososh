import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { DEFAULT_COLOR, CIRCLE, INPUT } from '../constants';


describe('Проверка корректной визуализации последовательности Фибоначчи', () => {
  beforeEach(() => {    
    cy.visit('/fibonacci');
  });

  it('Eсли в поле ввода пусто, то кнопка добавления недоступна', function () {
    cy.get(INPUT).should('have.value', '');
    cy.contains('Рассчитать').should('be.disabled');
  });

  it('Корректная отработка алгоритма рассчета последовательности Фибоначчи', () =>{
    cy.clock();
    cy.get(INPUT).type("5").should('have.value', 5);
    cy.contains('Рассчитать').should("not.be.disabled").click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).as("circle");
    cy.get("@circle").eq(0).should("have.css", "border", DEFAULT_COLOR).contains(1);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("@circle").eq(1).should("have.css", "border", DEFAULT_COLOR).contains(1);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("@circle").eq(2).should("have.css", "border", DEFAULT_COLOR).contains(2);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("@circle").eq(3).should("have.css", "border", DEFAULT_COLOR).contains(3);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("@circle").eq(4).should("have.css", "border", DEFAULT_COLOR).contains(5);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get("@circle").eq(5).should("have.css", "border", DEFAULT_COLOR).contains(8);
    cy.get(INPUT).clear();
    cy.contains('Рассчитать').should("be.disabled");
  }); 
});
