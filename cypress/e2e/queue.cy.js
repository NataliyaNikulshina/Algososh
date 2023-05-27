import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { DEFAULT_COLOR, CHANGING_COLOR, MODIFIED_COLOR } from '../constants';


describe('Проверка корректной визуализации последовательности Фибоначчи', () => {
  beforeEach(() => {    
    cy.visit('/queue');
  });

  it('Eсли в поле ввода пусто, то кнопка добавления недоступна', function () {
    cy.get('input').should('have.value', '');
    cy.contains('Добавить').should('be.disabled');
  });

//   it('Корректная отработка алгоритма рассчета последовательности Фибоначчи', () =>{
//     cy.clock();
//     cy.get('input').type("5").should('have.value', 5);
//     cy.contains('Рассчитать').should("not.be.disabled").click();
//     cy.tick(SHORT_DELAY_IN_MS);
//     cy.get('[class*=circle_circle]').as("circle");
//     cy.get("@circle").eq(0).should("have.css", "border", DEFAULT_COLOR).contains(1);
//     cy.tick(SHORT_DELAY_IN_MS);
//     cy.get("@circle").eq(1).should("have.css", "border", DEFAULT_COLOR).contains(1);
//     cy.tick(SHORT_DELAY_IN_MS);
//     cy.get("@circle").eq(2).should("have.css", "border", DEFAULT_COLOR).contains(2);
//     cy.tick(SHORT_DELAY_IN_MS);
//     cy.get("@circle").eq(3).should("have.css", "border", DEFAULT_COLOR).contains(3);
//     cy.tick(SHORT_DELAY_IN_MS);
//     cy.get("@circle").eq(4).should("have.css", "border", DEFAULT_COLOR).contains(5);
//     cy.tick(SHORT_DELAY_IN_MS);
//     cy.get("@circle").eq(5).should("have.css", "border", DEFAULT_COLOR).contains(8);
//     cy.get('input').clear();
//     cy.contains('Рассчитать').should("be.disabled");
//   }); 
});
