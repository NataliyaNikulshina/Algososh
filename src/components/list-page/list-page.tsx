import React, { ChangeEvent, FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { nanoid } from "nanoid";
import listStyle from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { linkedList, Node } from "./linked-list";
import { TArrCircle } from "../../types/arr-circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { setDelay } from "../../utils/setDelay";
import { MAX_LENGTH_INPUT, MIN_VAL_INPUT } from "../../constants/element-captions";



export const ListPage: FC = () => {
  const [loader, setLoader] = useState({
    addHead: false,
    deleteHead: false,
    addTail: false,
    deleteTail: false,
    addIndex: false,
    deleteIndex: false,
    disabled: false
  });
  const [array, setArray] = useState<Node<TArrCircle>[]>(linkedList.getArray());
  const [inputValue, setInputValue] = useState({
    value: "",
    index: "",
  });
  const [circleIndex, setCircleIndex] = useState(-1);
  const [addSmallCircle, setSmallCircle]= useState({
    add: false,
    delete: false,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const addHead = async () => {
    setLoader({ ...loader, addHead: true, disabled: true });
    setCircleIndex(array.length);
    setSmallCircle({...addSmallCircle, add:true})
    await setDelay(SHORT_DELAY_IN_MS);
    setSmallCircle({...addSmallCircle, add:false})
    linkedList.addHead({el: inputValue.value, color: ElementStates.Modified});
    setArray([...linkedList.getArray()]);
    await setDelay(SHORT_DELAY_IN_MS);
    linkedList.getFirst()!.value.color = ElementStates.Default;
    setArray([...linkedList.getArray()]);
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, addHead: false, disabled: false });
  };

  const addTail = async () => {
    setLoader({ ...loader, addTail: true, disabled: true });
    setCircleIndex(1);
    setSmallCircle({...addSmallCircle, add:true})
    await setDelay(SHORT_DELAY_IN_MS);
    setSmallCircle({...addSmallCircle, add:false})
    linkedList.addTail({el: inputValue.value, color: ElementStates.Modified});
    setArray([...linkedList.getArray()]);
    await setDelay(SHORT_DELAY_IN_MS);
    linkedList.getLast()!.value.color = ElementStates.Default;
    setArray([...linkedList.getArray()]);
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, addTail: false, disabled: false });
  };

  const deleteHead = async () => {
    setLoader({ ...loader, deleteHead: true, disabled: true });
    setCircleIndex(array.length);
    linkedList.getFirst()!.value.el = "";
    setSmallCircle({...addSmallCircle, delete:true})
    await setDelay(SHORT_DELAY_IN_MS);
    setSmallCircle({...addSmallCircle, delete:false})
    linkedList.deleteHead();
    setArray([...linkedList.getArray()]);
    setLoader({ ...loader, deleteHead: false, disabled: false });
  };

  const deleteTail = async () => {
    setLoader({ ...loader, deleteTail: true, disabled: true });
    setCircleIndex(1);
    linkedList.getLast()!.value.el = "";
    setSmallCircle({...addSmallCircle, delete:true})
    await setDelay(SHORT_DELAY_IN_MS);
    setSmallCircle({...addSmallCircle, delete:false})
    linkedList.deleteTail();
    setArray([...linkedList.getArray()]);
    setLoader({ ...loader, deleteTail: false, disabled: false });
  };

  const addAtIndex = async (value: TArrCircle, index:number) => {
    setLoader({ ...loader, addIndex: true, disabled: true });
    for(let i=0;i<index;i++){
      setCircleIndex(array.length-i);
      setSmallCircle({...addSmallCircle, add:true})
      await setDelay(SHORT_DELAY_IN_MS);
      setSmallCircle({...addSmallCircle, add:false})
    }
    linkedList.addAtIndex(value, index);
    setArray([...linkedList.getArray()]);
    await setDelay(SHORT_DELAY_IN_MS);
    linkedList.getAtIndex(index)!.value.color = ElementStates.Default;
    setArray([...linkedList.getArray()]);
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, addIndex: false, disabled: false });
  };

  const deleteAtIndex = async (index:number) => {
    setLoader({ ...loader, deleteIndex: true, disabled: true });
    for(let i=0;i<=index;i++){
      setCircleIndex(array.length-i);
      linkedList.getAtIndex(i)!.value.color = ElementStates.Changing;
      setArray([...linkedList.getArray()]);
      await setDelay(SHORT_DELAY_IN_MS);
    }
    linkedList.getAtIndex(index)!.value.color = ElementStates.Default;
    await setDelay(SHORT_DELAY_IN_MS); 
    linkedList.getAtIndex(index)!.value.el = "";
    setSmallCircle({...addSmallCircle, delete:true})
    linkedList.deleteAtIndex(index);
    await setDelay(SHORT_DELAY_IN_MS);
    setSmallCircle({...addSmallCircle, delete:false})
    linkedList.getArray().forEach((item) => (item.value.color = ElementStates.Default));
    setArray([...linkedList.getArray()]);
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, deleteIndex: false, disabled: false });
  };


  return (
    <SolutionLayout title="Связный список">
      <form className={listStyle.form}>
      <Input
            maxLength={MAX_LENGTH_INPUT}
            isLimitText
            placeholder="Введите значение"
            name="value"
            extraClass={listStyle.input}
            value={inputValue.value}
            onChange={onChange}
          />
          <Button
            type="button"
            text="Добавить в head"
            linkedList="small"
            onClick={addHead}
            disabled={ !inputValue.value || array.length === 7 || loader.disabled}
            isLoader={loader.addHead}
          />
          <Button
            type="button"
            text="Добавить в tail"
            linkedList="small"
            onClick={addTail}
            disabled={ !inputValue.value || array.length === 7 || loader.disabled}
            isLoader={loader.addTail}
          />
          <Button
            type="button"
            text="Удалить из head"
            linkedList="small"
            onClick={deleteHead}
            disabled={!array || array.length === 0 || loader.disabled}
            isLoader={loader.deleteHead}
          />
          <Button
            type="button"
            text="Удалить из tail"
            linkedList="small"
            onClick={deleteTail}
            disabled={!array || array.length === 0 || loader.disabled}
            isLoader={loader.deleteTail}
          />
           <Input
            type="number"
            placeholder="Введите индекс"
            name="index"
            min={MIN_VAL_INPUT}
            extraClass={listStyle.input}
            max={array.length - 1}
            value={inputValue.index}
            onChange={onChange}
          />
          <Button
            type="button"
            text="Добавить по индексу"
            linkedList="big"
            onClick={() => addAtIndex({el: inputValue.value, color: ElementStates.Modified}, Number(inputValue.index))}
            disabled={!!!(inputValue.index && inputValue.value) ||
              loader.disabled ||
              Number(inputValue.index) > array.length - 1 ||
              Number(inputValue.index) < 0
            }
            isLoader={loader.addIndex}
          />
          <Button
            type="button"
            text="Удалить по индексу"
            linkedList="big"
            onClick={() => deleteAtIndex(Number(inputValue.index))}
             disabled={
               !inputValue.index ||
               loader.disabled ||
               Number(inputValue.index) > array.length - 1 ||
               Number(inputValue.index) < 0
             }
            isLoader={loader.deleteIndex}
          />
      </form>
      <ul className={listStyle.list}>
        {array && array.map((item, index) => {
          return (
            <li className={listStyle.list__item} key={nanoid()}>
              {addSmallCircle.add && linkedList.getSize() - circleIndex === index && (
              <Circle
                state={ElementStates.Changing}
                isSmall={true}
                letter={inputValue.value}
                extraClass={listStyle.small_circle}
              />
            )}
              <Circle
                index={index}
                letter={item.value.el}
                state={item.value.color}
                head={index === 0 && !addSmallCircle.add
                  ? "head"
                  : ""}
                tail={index === array.length - 1  && !addSmallCircle.delete
                    ? "tail"
                    : ""}
              />
              {index !== array.length - 1 && <ArrowIcon />}
              {addSmallCircle.delete && linkedList.getSize() - circleIndex === index && (
              <Circle
                state={ElementStates.Changing}
                isSmall={true}
                letter={inputValue.value}
                extraClass={listStyle.small_circle_delete}
              />
            )}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
