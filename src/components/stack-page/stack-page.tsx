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

export const StackPage: FC = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [arr, setArr] = useState<TArrCircle[]>([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [inputVal, setInputVal] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const addElement = async () => {
    setLoader(true);
    //setArr(inputVal.split(''));
    stack.push({ el: inputVal, color: ElementStates.Changing });
    setArr([...stack.getContainer()]);
    setInputVal("");
    setCurrIndex(stack.getSize() - 1);
    await new Promise<void>((res) => setTimeout(res, 500)); 
    stack.peak()!.color = ElementStates.Default;
    setArr([...stack.getContainer()]);
    setCurrIndex(currIndex + 1);
    console.log(arr);
    setLoader(false);
  }

  const deleteElement = async () => {
    setLoader(true);
    //setArr(inputVal.split(''));
    setCurrIndex(stack.getSize() - 1);
    await new Promise<void>((res) => setTimeout(res, 500)); 
    stack.pop();
    stack.peak()!.color = ElementStates.Default;
    setArr([...stack.getContainer()]);
    setLoader(false);
  }

  const clearEl = async () => {
    setLoader(true);
    //setArr(inputVal.split(''));
    setCurrIndex(stack.getSize() - 1);
    await new Promise<void>((res) => setTimeout(res, 500)); 
    stack.clear();
    setArr([...stack.getContainer()]);
    setCurrIndex(0)
    setLoader(false);
  }

  return (
    <SolutionLayout title="Стек">
      <form className={stackStyle.form} >
        <div className={stackStyle.wrapper}>
          <Input
            type = "text"
            maxLength={4}
            isLimitText={true}
            onChange={onChange}
            value={inputVal}
          />
          <Button
            text="Добавить"
            type="button"
            disabled={!inputVal}
            onClick={addElement}
            isLoader={loader}
          />
          <Button
            text="Удалить"
            type="button"
            disabled={currIndex === 0}
            onClick={deleteElement}
            extraClass={stackStyle.button}
            isLoader={loader}
          />
        </div>
        <Button
          text="Очистить"
          type="button"
          disabled={currIndex === 0}
          onClick={clearEl}
          isLoader={loader}
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
