import { DELAY_IN_MS } from "../../constants/delays";
import { TArrCircle } from "../../types/arr-circle";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/setDelay";
import { swap } from "../../utils/swap";

export const reverseElements = async (str: string, setArr?: React.Dispatch<React.SetStateAction<TArrCircle[]>>) => {
    const array = str.split('').map((el: string) => {
        return {el,color: ElementStates.Default}; 
      });
    let start = 0;
    let end = array.length - 1;

    while (start <= end){
      if (start !== end) {
        array[start].color = ElementStates.Changing;
        array[end].color = ElementStates.Changing;
        if (setArr) {setArr([...array]);}
        await setDelay(DELAY_IN_MS);
        swap(array, start, end);
      }
        array[start].color = ElementStates.Modified;
        array[end].color = ElementStates.Modified;
        if (setArr) {setArr([...array]);}
        start++;
        end--;
      }
      return array;
    }


