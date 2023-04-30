import { TArrColumn } from "../types/arr-column";
import { ElementStates } from "../types/element-states";
//import { Direction } from "../../types/direction";

export const randomArr = (): TArrColumn[] =>{
    let arr: TArrColumn[] = [];
    const minLen = 3;
    const maxLen = 17; 
    const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    for (let i=0; i<len; i++){
        arr.push({ num: Math.round(Math.random() * 100), color: ElementStates.Default });
    }
   // console.log(len, arr);
  return arr;
}