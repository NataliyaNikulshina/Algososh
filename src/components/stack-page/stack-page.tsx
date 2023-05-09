import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stackStyle from "./stack-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { TArrCircle } from "../../types/arr-circle";
import { setDelay } from "../../utils/setDelay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MAX_LENGTH_INPUT } from "../../constants/element-captions";

export const StackPage: FC = () => {
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false,
  });
  const [arr, setArr] = useState<TArrCircle[]>([]);
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [inputVal, setInputVal] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const addElement = async () => {
    setLoader({ ...loader, add: true });
    stack.push({ el: inputVal, color: ElementStates.Changing });
    setArr([...stack.getContainer()]);
    setInputVal("");
    setCurrIndex(stack.getSize() - 1);
    await setDelay(SHORT_DELAY_IN_MS);
    stack.peak()!.color = ElementStates.Default;
    setArr([...stack.getContainer()]);
    setCurrIndex(currIndex + 1);
    setLoader({ ...loader, add: false });
  }

  const deleteElement = async () => {
    setLoader({ ...loader, delete: true });
    stack.peak()!.color = ElementStates.Changing;
    stack.pop();
    setCurrIndex(stack.getSize() - 1);
    await setDelay(SHORT_DELAY_IN_MS);
    stack.peak()!.color = ElementStates.Default;
    setArr([...stack.getContainer()]);
    setLoader({ ...loader, delete: false });
  }

  const clearEl = async () => {
    setLoader({ ...loader, clear: true });
    setCurrIndex(stack.getSize() - 1);
    await setDelay(SHORT_DELAY_IN_MS);
    stack.clear();
    setArr([...stack.getContainer()]);
    setCurrIndex(0)
    setLoader({ ...loader, clear: false });
  }

  return (
    <SolutionLayout title="Стек">
      <form className={stackStyle.form} >
        <div className={stackStyle.wrapper}>
          <Input
            type = "text"
            maxLength={MAX_LENGTH_INPUT}
            isLimitText={true}
            onChange={onChange}
            value={inputVal}
          />
          <Button
            text="Добавить"
            type="button"
            disabled={!inputVal || loader.clear || loader.delete}
            onClick={addElement}
            isLoader={loader.add}
          />
          <Button
            text="Удалить"
            type="button"
            disabled={currIndex === 0 || loader.clear || loader.add}
            onClick={deleteElement}
            extraClass={stackStyle.button}
            isLoader={loader.delete}
          />
        </div>
        <Button
          text="Очистить"
          type="button"
          disabled={currIndex === 0 || loader.add || loader.delete}
          onClick={clearEl}
          isLoader={loader.clear}
        />
      </form>
      <ul className={stackStyle.list}>
        {arr && arr.map(({el, color}, index) => (
          <li key={index}>
            <Circle 
              key={nanoid()} 
              letter={el} 
              state={color} 
              index={index}
              head={stack.getSize() - 1 === index ? "top" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
