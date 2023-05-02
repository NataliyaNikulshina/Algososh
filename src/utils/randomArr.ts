import { TArrCircle } from "../types/arr-circle";
import { TArrColumn } from "../types/arr-column";
import { ElementStates } from "../types/element-states";
//import { Direction } from "../../types/direction";

export const randomArr = (minLen: number, maxLen: number): TArrColumn[] =>{
    let arr: TArrColumn[] = [];
    const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    for (let i=0; i<len; i++){
        arr.push({ num: Math.round(Math.random() * 100), color: ElementStates.Default });
    }
   // console.log(len, arr);
  return arr;
}

export const randomArrStr = (minLen: number, maxLen: number): TArrCircle[] =>{
    let arr: TArrCircle[] = [];
    const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    for (let i=0; i<len; i++){
        arr.push({ el: String(Math.round(Math.random() * 100)), color: ElementStates.Default });
    }
   // console.log(len, arr);
  return arr;
}