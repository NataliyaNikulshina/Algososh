import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import queueStyle from "./queue-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { ElementStates } from "../../types/element-states";
import { TArrCircle } from "../../types/arr-circle";
import { queue } from "./queue";

export const QueuePage: FC = () => {
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false
  });
  const [arr, setArr] = useState<TArrCircle[]>(queue.getContainer());
  const [inputVal, setInputVal] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const addElement = async () => {
    setLoader({ ...loader, add: true });
    queue.enqueue({ el: inputVal, color: ElementStates.Changing });
    setArr([...queue.getContainer()]);
    setInputVal("");
    await new Promise<void>((res) => setTimeout(res, 500)); 
    queue.getContainer()[queue.getTail() - 1].color = ElementStates.Default;
    setArr([...queue.getContainer()]);
    console.log(arr);
    console.log(queue.getTail());
    setLoader({ ...loader, add: false });
  };

  const deleteElement = async () => {
    //console.log(queue.getSize());
    setLoader({ ...loader, delete: true });
    queue.getContainer()[queue.getTail() - 1].color = ElementStates.Default;
    setArr([...queue.getContainer()]);
    await new Promise<void>((res) => setTimeout(res, 500)); 
    queue.dequeue();
    setArr([...queue.getContainer()]);
    setLoader({ ...loader, delete: false });
  };

  const clearEl = async () => {
    setLoader({ ...loader, clear: true });
    await new Promise<void>((res) => setTimeout(res, 500)); 
    queue.clear();
    setArr([...queue.getContainer()]);
    setLoader({ ...loader, clear: false });
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={queueStyle.form} >
        <div className={queueStyle.wrapper}>
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
            isLoader={loader.add}
          />
          <Button
            text="Удалить"
            type="button"
            disabled={loader.add || queue.isEmpty()}
            onClick={deleteElement}
            extraClass={queueStyle.button}
            isLoader={loader.delete}
          />
        </div>
        <Button
          text="Очистить"
          type="button"
          disabled={loader.add || loader.delete || queue.isEmpty()}
          onClick={clearEl}
          isLoader={loader.clear}
        />
      </form>
      <ul className={queueStyle.list}>
        {arr && arr.map(({el, color}, index) => (
          <li key={index}>
            <Circle 
              key={nanoid()} 
              index={index}
              letter={el} 
              state={color}
              head={index === queue.getHead() && !queue.isEmpty() ? "head" : ""}
              tail={index === queue.getTail() - 1 && !queue.isEmpty() ? "tail" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
