import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { DEFAULT_COLOR, CHANGING_COLOR, CIRCLE, CIRCLE_CONTENT, INPUT} from '../constants';


describe('Проверка корректной визуализации работы со стеком', () => {
  beforeEach(() => {    
    cy.visit('/stack');
  });

  it('Eсли в поле ввода пусто, то кнопка добавления недоступна', function () {
    cy.get(INPUT).should('have.value', '');
    cy.contains('Добавить').should('be.disabled');
  });

  it('Добавление и удаление элемента в стек корректно', function () {
    cy.clock();
    cy.get(INPUT).type("abc").should('have.value', "abc");
    cy.contains('Добавить').should("not.be.disabled").click();
    cy.get(CIRCLE).as("circle");
    cy.get(CIRCLE_CONTENT).as("circle_content");
    cy.get("@circle").eq(0).should("have.css", "border", CHANGING_COLOR).contains("abc");
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('@circle').eq(0).should("have.css", "border", DEFAULT_COLOR).contains("abc");
    cy.get('@circle_content').children("div:first").should("have.text", "top");
    cy.get('@circle_content').children("p").should("have.text", "0");
    cy.contains('Удалить').should("not.be.disabled").click();
    cy.get("@circle").eq(0).should("have.css", "border", CHANGING_COLOR).contains("abc");
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('@circle').should('have.length', 0);
    cy.contains('Удалить').should("be.disabled");
    cy.contains('Очистить').should("be.disabled");
  });

  it('Очистка стека работает корректно', function () {
    const testArr = ["A", "B", "C"];
    testArr.map((item) => {
    cy.get(INPUT).type(item);
    cy.contains('Добавить').should("not.be.disabled").click();
    cy.wait(SHORT_DELAY_IN_MS)
    });
    cy.wait(3000);
    cy.contains('Очистить').should("not.be.disabled").click();
    cy.get(CIRCLE).should('have.length', 0);
    cy.contains('Удалить').should("be.disabled");
    cy.contains('Очистить').should("be.disabled");
  });
});
