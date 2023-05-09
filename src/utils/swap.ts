import { TArrCircle } from "../types/arr-circle";

export const swap = (arr: TArrCircle[], firstIndex: number, secondIndex: number): TArrCircle[]=> {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
  }