import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { DEFAULT_COLOR, CHANGING_COLOR, CIRCLE, CIRCLE_CONTENT, INPUT } from '../constants';

describe('Проверка корректной визуализации работы с очередью', () => {
  beforeEach(() => {    
    cy.visit('/queue');
  });

  it('Eсли в поле ввода пусто, то кнопка добавления недоступна', function () {
    cy.get(INPUT).should('have.value', '');
    cy.contains('Добавить').should('be.disabled');
  });

  it('Добавление и удаление элемента в очередь корректно', function () {
    const testArr = ["A", "B", "C"];
    cy.get(CIRCLE).as("circle");
    cy.get(CIRCLE_CONTENT).as("circle_content");
    testArr.map((item, index) => {
    cy.get(INPUT).type(item);
    cy.contains('Добавить').should("not.be.disabled").click();
    cy.get("@circle").eq(index).should("have.css", "border", CHANGING_COLOR).contains(item);
    cy.get('@circle_content').children("div:first").should("have.text", "head");
    cy.get('@circle_content').children(`p:nth(${index})`).should("have.text", index.toString());
    cy.get('@circle_content').children(`div:nth(${index+2*(index+1)})`).should("have.text", "tail");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circle').eq(index).should("have.css", "border", DEFAULT_COLOR).contains(item);
    });
    cy.wait(3000);
    cy.contains('Удалить').should("not.be.disabled").click();
    cy.get("@circle").eq(0).should("have.css", "border", CHANGING_COLOR).contains("A");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circle").eq(0).should("have.css", "border", DEFAULT_COLOR);
    cy.get("@circle").eq(0).should('have.value', '');
    cy.get('@circle_content').children("div:nth(3)").should("have.text", "head");
  });

  it('Очистка очереди работает корректно', function () {
    const testArr = ["A", "B", "C"];
    testArr.map((item) => {
    cy.get(INPUT).type(item);
    cy.contains('Добавить').should("not.be.disabled").click();
    cy.wait(SHORT_DELAY_IN_MS)
    });
    cy.wait(3000);
    cy.contains('Очистить').should("not.be.disabled").click();
    cy.get(CIRCLE).children().nextAll().should('not.exist');
    cy.contains('Удалить').should("be.disabled");
    cy.contains('Очистить').should("be.disabled");
  });
});
