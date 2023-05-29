describe('Тестирование переходов по страницам', () => {
    beforeEach(() => {    
        cy.visit('/');
    });

    it('Переход на страницу "Cтрока"', function () {
    cy.get('a[href*="/recursion"]').click();
    cy.contains('Строка');
  });

  it('Переход на страницу "Последовательность Фибоначчи"', function () {
    cy.get('a[href*="/fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  });

  it('Переход на страницу "Сортировка массива"', function () {
    cy.get('a[href*="/sorting"]').click();
    cy.contains('Сортировка массива');
  });

  it('Переход на страницу "Стек"', function () {
    cy.get('a[href*="/stack"]').click();
    cy.contains('Стек');
  });

  it('Переход на страницу "Очередь"', function () {
    cy.get('a[href*="/queue"]').click();
    cy.contains('Очередь');
  });

  it('Переход на страницу "Связный список"', function () {
    cy.get('a[href*="/list"]').click();
    cy.contains('Связный список');
  });
});  