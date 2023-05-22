import {selectionSort, bubbleSort, bubbleSortTest, selectionSortTest} from './utils';
import { Direction } from "../../types/direction";
import {ElementStates} from "../../types/element-states"

const inputArr = [
    { value: 2, color: ElementStates.Default },
    { value: 0, color: ElementStates.Default },
    { value: 1, color: ElementStates.Default },
  ];
  const outputArrIncrease = [
    { value: 0, color: ElementStates.Modified },
    { value: 1, color: ElementStates.Modified },
    { value: 2, color: ElementStates.Modified },
  ];
  const outputArrDecrease = [
    { value: 2, color: ElementStates.Modified },
    { value: 1, color: ElementStates.Modified },
    { value: 0, color: ElementStates.Modified },
  ];

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {

    describe("Сортировка пустого массива", () => {
        test("Корректная сортировка выбором по убыванию", async () => {
            expect( await selectionSort([], Direction.Descending)).toEqual([]);
        });
        test("Корректная сортировка выбором по возрастанию", async () => {
            expect( await selectionSort([], Direction.Ascending)).toEqual([]);
        });
        test("Корректная сортировка пузырьком по убыванию", async () => {
            expect( await bubbleSort([], Direction.Descending)).toEqual([]);
        });
        test("Корректная сортировка пузырьком по возрастанию", async () => {
            expect( await bubbleSort([], Direction.Ascending)).toEqual([]);
        });
    });

    describe("Сортировка массива из одного эл-та", () => {
        test("Корректная сортировка выбором по убыванию", async () => {
            expect( await selectionSort([
                { value: 3, color: ElementStates.Default }
            ], Direction.Descending)).toEqual([
                { value: 3, color: ElementStates.Modified }
            ]);
        });
        test("Корректная сортировка выбором по возрастанию", async () => {
            expect( await selectionSort([
                { value: 3, color: ElementStates.Default }
            ], Direction.Ascending)).toEqual([
                { value: 3, color: ElementStates.Modified }
            ]);
        });
        test("Корректная сортировка пузырьком по убыванию", async () => {
            expect( await bubbleSort([
                { value: 3, color: ElementStates.Default }
            ], Direction.Descending)).toEqual([
                { value: 3, color: ElementStates.Modified }
            ]);
        });
        test("Корректная сортировка пузырьком по возрастанию", async () => {
            expect( await bubbleSort([
                { value: 3, color: ElementStates.Default }
            ], Direction.Ascending)).toEqual([
                { value: 3, color: ElementStates.Modified }
            ]);
        });
    });

    describe("Сортировка массива из нескольких эл-тов", () => {
        test("Корректная сортировка выбором по убыванию", () => {
            expect(selectionSortTest([2, 0, 1, 8], Direction.Descending)).toEqual([8, 2, 1 , 0]);
        });
        test("Корректная сортировка выбором по возрастанию", () => {
            expect(selectionSortTest([2, 0, 1, 8], Direction.Ascending)).toEqual([0, 1, 2, 8]);
         });
        test("Корректная сортировка пузырьком по убыванию", () => {
            expect(bubbleSortTest([2, 0, 1, 8], Direction.Descending)).toEqual([8, 2, 1 , 0]);
        });
         test("Корректная сортировка пузырьком по возрастанию", () => {
            expect(bubbleSortTest([2, 0, 1, 8], Direction.Ascending)).toEqual([0, 1, 2, 8]);
         });
    });
});