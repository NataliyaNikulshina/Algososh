import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { DEFAULT_COLOR, CHANGING_COLOR, MODIFIED_COLOR, CIRCLE, CIRCLE_CONTENT, CIRCLE_SMALL } from '../constants';


describe('Проверка корректной визуализации структуры данных Связанный список', () => {
  beforeEach(() => {    
    cy.visit('/list');
    cy.get(CIRCLE).as("circle");
    cy.get('@circle').its("length").as("size");
    cy.get(CIRCLE_CONTENT).as("circle-content");
  });

  it('Eсли в полях ввода пусто, то кнопки добавления  и удаления по индексу недоступны', function () {
    cy.get("[name='value']").should('have.value', '');
    cy.get("[name='index']").should('have.value', '');
    cy.contains('Добавить в head').should('be.disabled');
    cy.contains('Добавить в tail').should('be.disabled');
    cy.contains('Добавить по индексу').should('be.disabled');
    cy.contains('Удалить по индексу').should('be.disabled');
  });

  it('Отрисовка дефолтного списка работает корректно', function () {
    cy.get('@circle-content').first().contains('head')
    cy.get('@circle').should('have.css', 'border', DEFAULT_COLOR)
    cy.get('@circle-content').last().contains('tail')
  });

  it('Добавление элемента в head работает корректно', function () {
    cy.get("[name='value']").type('55').should('have.value', '55');
    cy.contains('Добавить в head').should('not.be.disabled').click();
    cy.get(CIRCLE_SMALL).should("have.css", "border", CHANGING_COLOR).contains('55');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circle').first().should("have.css", "border", MODIFIED_COLOR).contains('55');
    cy.get('@circle-content').first().contains('head');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circle').first().should("have.css", "border", DEFAULT_COLOR).contains('55');
  });

  it('Удаление элемента из head работает корректно', function () {
    cy.get('@circle').should('have.length', this.size);
    cy.get('@circle-content').first().contains('head');
    cy.contains('Удалить из head').should('not.be.disabled').click();
    cy.get(CIRCLE_SMALL).should("have.css", "border", CHANGING_COLOR).should('not.be.empty');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circle').should('have.length', this.size - 1);
    cy.get('@circle-content').first().contains('head');
  });

  it('Добавление элемента в tail работает корректно', function () {
    cy.get("[name='value']").type('22').should('have.value', '22');
    cy.contains('Добавить в tail').should('not.be.disabled').click();
    cy.get(CIRCLE_SMALL).should("have.css", "border", CHANGING_COLOR).contains('22');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circle').last().should("have.css", "border", MODIFIED_COLOR).contains('22');
    cy.get('@circle-content').last().contains('tail');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circle').last().should("have.css", "border", DEFAULT_COLOR).contains('22');

  });

  it('Удаление элемента из tail работает корректно', function () {
    cy.get('@circle').should('have.length', this.size);
    cy.get('@circle-content').last().contains('tail');
    cy.contains('Удалить из tail').should('not.be.disabled').click();
    cy.get(CIRCLE_SMALL).should("have.css", "border", CHANGING_COLOR).should('not.be.empty');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circle').should('have.length', this.size - 1);
    cy.get('@circle-content').last().contains('tail');

  });

  it('Добавление элемента по индексу работает корректно', function () {
    cy.get("[name='value']").type('44').should('have.value', '44');
    cy.get("[name='index']").type('1').should('have.value', '1');
    cy.contains('Добавить по индексу').should('not.be.disabled').click();
    cy.get(CIRCLE_SMALL).should("have.css", "border", CHANGING_COLOR).contains('44');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circle').eq(1).should("have.css", "border", MODIFIED_COLOR).contains('44');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circle').eq(1).should("have.css", "border", DEFAULT_COLOR).contains('44');

  });

  it('Удаление элемента по индексу работает корректно', function () {
    cy.get("[name='index']").type('1').should('have.value', '1');
    cy.get('@circle').should('have.length', this.size);
    cy.contains('Удалить по индексу').should('not.be.disabled').click();
    cy.get(CIRCLE_SMALL).should("have.css", "border", CHANGING_COLOR).should('not.be.empty');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@circle').should('have.length', this.size - 1);
  });
});
