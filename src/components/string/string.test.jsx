import { reverseElements } from "./utils";

describe("Тестирование алгоритма разворота строки", () => {
    
    test("Корректный разворот пустой строки", async () => {
      expect( await reverseElements("")).toEqual([]);
    });

    test("Корректный разворот строки с одним символом", async () => {
      expect( await reverseElements("s")).toEqual([{ el: 's', color: 'modified' }]);
    });

    test("Корректный разворот строки с нечетным количеством символов", async () => {
      expect( await reverseElements("str")).toEqual([
        { el: 'r', color: 'modified' },
        { el: 't', color: 'modified' },
        { el: 's', color: 'modified' }
      ]);
    });

    test("Корректный разворот строки с чётным количеством символов", async () => {
      expect( await reverseElements("test")).toEqual([
        { el: 't', color: 'modified' },
        { el: 's', color: 'modified' },
        { el: 'e', color: 'modified' },
        { el: 't', color: 'modified' }
      ]);
    });

});