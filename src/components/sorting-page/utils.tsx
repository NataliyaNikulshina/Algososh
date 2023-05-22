import { TArrColumn } from "../../types/arr-column";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/setDelay";
import { DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { swapNum, swapTest } from "../../utils/swap";


export const selectionSort = async (arr: TArrColumn[], type: Direction, setArr?: React.Dispatch<React.SetStateAction<TArrColumn[]>>) =>{
    for (let i = 0; i < arr.length; i++) {
      let maxInd = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        if (setArr) {setArr([...arr]);}
        await setDelay(DELAY_IN_MS);
        if (type === Direction.Ascending ? arr[j].num < arr[maxInd].num : arr[j].num > arr[maxInd].num) {
          maxInd = j;
        }
        arr[i].color = ElementStates.Default;
        arr[j].color = ElementStates.Default;
        if (setArr) {setArr([...arr]);}
      }
      //([arr[i], arr[maxInd]] = [arr[maxInd],arr[i]]);
      swapNum(arr, i, maxInd);
      arr[i].color = ElementStates.Modified;
    }
    if (setArr) {setArr([...arr]);}
    return arr;
  };

export const bubbleSort = async (arr: TArrColumn[], type: Direction, setArr?: React.Dispatch<React.SetStateAction<TArrColumn[]>>) => {
    for (let i=0; i < arr.length; i++){
      for (let j=0; j < arr.length - i - 1; j++){
        arr[j].color = ElementStates.Changing;
        arr[j+1].color = ElementStates.Changing;
        if (setArr) {setArr([...arr]);}
        await setDelay(DELAY_IN_MS);
        if (type === Direction.Ascending ? arr[j].num > arr[j+1].num : arr[j].num < arr[j+1].num) {
          //([arr[j], arr[j+1]] = [arr[j+1],arr[j]]);  
          swapNum(arr, j, j+1);
        };
        arr[j].color = ElementStates.Default;
        arr[j+1].color = ElementStates.Default;
      }
     arr[arr.length - i - 1].color = ElementStates.Modified;
    }
    if (setArr) {setArr([...arr]);}
    return arr;
  }

  export const selectionSortTest = (arr: number[], type: Direction): number[] => {
    for (let i = 0; i < arr.length; i++) {
      let maxInd = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (type === Direction.Ascending ? arr[j] < arr[maxInd] : arr[j] > arr[maxInd]) {
          maxInd = j;
        }
      }
      swapTest(arr, i, maxInd);
    }
    return arr;
  };

  export const bubbleSortTest = (arr: number[], type: Direction): number[] => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (
          type === Direction.Ascending
            ? arr[j] > arr[j + 1]
            : arr[j] < arr[j + 1]
        ) {
          swapTest(arr, j, j + 1);
        }
      }
    }
    return arr;
  };

