import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import stringStyle from './string.module.css';
import { ElementStates } from "../../types/element-states";
import { TArrCircle } from "../../types/arr-circle";
import { swap } from "../../utils/swap";
import { nanoid } from "nanoid";
import { setDelay } from "../../utils/setDelay";
import { DELAY_IN_MS } from "../../constants/delays";
import { MAX_LENGTH_STR } from "../../constants/element-captions";


export const StringComponent: FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [loader, setLoader] = useState(false);
  const [arr, setArr] = useState<TArrCircle[]>([]);

  const reverseElements = async (array: TArrCircle[]) => {
    let start = 0;
    let end = array.length - 1;
    while (start <= end){
      if (start !== end) {
        array[start].color = ElementStates.Changing;
        array[end].color = ElementStates.Changing;
        setArr([...array]);
        await setDelay(DELAY_IN_MS);
        swap(array, start, end);
      }
        array[start].color = ElementStates.Modified;
        array[end].color = ElementStates.Modified;
       // console.log(array);
        setArr([...array]);
        start++;
        end--;
      }
    }
  

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const array = inputVal.split('').map((el: string) => {
      return {el,color: ElementStates.Default}; 
    });
    setArr(array);
    setLoader(true);
    await reverseElements(array);
    setLoader(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };


  return (
    <SolutionLayout title="Строка">
     <form className={stringStyle.form} onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          value={inputVal}
          maxLength={MAX_LENGTH_STR}
          isLimitText={true}
          type = "text"
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={loader}
          linkedList="small"
          disabled={!inputVal}
        />
      </form>
      <ul className={stringStyle.list}>
        {arr && arr.map(({ el, color }, index) => (
          <li key={index}>
            <Circle key={nanoid()} letter={el} state={color} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
