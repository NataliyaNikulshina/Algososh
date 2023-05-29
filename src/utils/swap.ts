import { TArrCircle } from "../types/arr-circle";
import { TArrColumn } from "../types/arr-column";

export const swap = (arr: TArrCircle[], firstIndex: number, secondIndex: number): TArrCircle[]=> {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
  }

export const swapNum = (arr: TArrColumn[], firstIndex: number, secondIndex: number): TArrColumn[]=> {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
  }

export const swapTest = (arr: number[], firstIndex: number, secondIndex: number): number[]=> {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
  }