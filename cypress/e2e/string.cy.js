import { DELAY_IN_MS } from "../../src/constants/delays";

describe('Проверка корректной визуализации алгоритма разворота строки', () => {
  beforeEach(() => {    
    cy.visit('/recursion');
  });

  it('Eсли в поле ввода пусто, то кнопка добавления недоступна', function () {
    cy.get('input').should('have.value', '')
    cy.contains('Развернуть').should('be.disabled')
  });

  it('Корректная отработка алгоритма разворота строки', () =>{
    cy.get('input').type("hello");
    cy.get("@button").should("not.be.disabled");

    cy.get('input').clear();
    cy.get("@button").should("be.disabled");
  }); 
});
