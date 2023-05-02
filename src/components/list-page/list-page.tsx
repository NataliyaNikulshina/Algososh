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



export const ListPage: FC = () => {
  const [loader, setLoader] = useState({
    addHead: false,
    deleteHead: false,
    addTail: false,
    deleteTail: false,
    addIndex: false,
    deleteIndex: false,
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
    setLoader({ ...loader, addHead: true });
    setCircleIndex(array.length);
    setSmallCircle({...addSmallCircle, add:true})
    await new Promise<void>((res) => setTimeout(res, 500)); 
    setSmallCircle({...addSmallCircle, add:false})
    linkedList.addHead({el: inputValue.value, color: ElementStates.Modified});
    setArray([...linkedList.getArray()]);
    await new Promise<void>((res) => setTimeout(res, 500)); 
    linkedList.getFirst()!.value.color = ElementStates.Default;
    setArray([...linkedList.getArray()]);
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, addHead: false });
  };

  const addTail = async () => {
    setLoader({ ...loader, addHead: true });
    setCircleIndex(1);
    setSmallCircle({...addSmallCircle, add:true})
    await new Promise<void>((res) => setTimeout(res, 500)); 
    setSmallCircle({...addSmallCircle, add:false})
    linkedList.addTail({el: inputValue.value, color: ElementStates.Modified});
    setArray([...linkedList.getArray()]);
    await new Promise<void>((res) => setTimeout(res, 500)); 
    linkedList.getLast()!.value.color = ElementStates.Default;
    setArray([...linkedList.getArray()]);
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, addHead: false });
  };

  const deleteHead = async () => {
    setLoader({ ...loader, deleteHead: true });
    setCircleIndex(array.length);
    linkedList.getFirst()!.value.el = "";
    setSmallCircle({...addSmallCircle, delete:true})
    await new Promise<void>((res) => setTimeout(res, 500)); 
    setSmallCircle({...addSmallCircle, delete:false})
    linkedList.deleteHead();
    setArray([...linkedList.getArray()]);
    setLoader({ ...loader, deleteHead: false });
  };

  const deleteTail = async () => {
    setLoader({ ...loader, deleteTail: true });
    setCircleIndex(1);
    linkedList.getLast()!.value.el = "";
    setSmallCircle({...addSmallCircle, delete:true})
    await new Promise<void>((res) => setTimeout(res, 500)); 
    setSmallCircle({...addSmallCircle, delete:false})
    linkedList.deleteTail();
    setArray([...linkedList.getArray()]);
    setLoader({ ...loader, deleteTail: false });
  };

  const addAtIndex = async (value: TArrCircle, index:number) => {
    setLoader({ ...loader, addIndex: true });
    for(let i=0;i<index;i++){
      setCircleIndex(array.length-i);
      setSmallCircle({...addSmallCircle, add:true})
      await new Promise<void>((res) => setTimeout(res, 500)); 
      setSmallCircle({...addSmallCircle, add:false})
    }
    linkedList.addAtIndex(value, index);
    setArray([...linkedList.getArray()]);
    await new Promise<void>((res) => setTimeout(res, 500)); 
    //console.log(linkedList.getAtIndex(index));
    linkedList.getAtIndex(index)!.value.color = ElementStates.Default;
    setArray([...linkedList.getArray()]);
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, addIndex: false });
  };

  const deleteAtIndex = async (index:number) => {
    setLoader({ ...loader, deleteIndex: true });
    for(let i=0;i<=index;i++){
      setCircleIndex(array.length-i);
      linkedList.getAtIndex(i)!.value.color = ElementStates.Changing;
      setArray([...linkedList.getArray()]);
      await new Promise<void>((res) => setTimeout(res, 500)); 
    }
 
    linkedList.getAtIndex(index)!.value.color = ElementStates.Default;
    await new Promise<void>((res) => setTimeout(res, 500)); 
    linkedList.getAtIndex(index)!.value.el = "";
    setSmallCircle({...addSmallCircle, delete:true})
    linkedList.deleteAtIndex(index);
    await new Promise<void>((res) => setTimeout(res, 500)); 
    setSmallCircle({...addSmallCircle, delete:false})
    linkedList.getArray().forEach((item) => (item.value.color = ElementStates.Default));
    setArray([...linkedList.getArray()]);
    setLoader({ ...loader, deleteIndex: false });
  };


  return (
    <SolutionLayout title="Связный список">
      <form className={listStyle.form}>
      <Input
            maxLength={4}
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
            disabled={ !inputValue.value || array.length === 7}
            isLoader={loader.addHead}
          />
          <Button
            type="button"
            text="Добавить в tail"
            linkedList="small"
            onClick={addTail}
            disabled={ !inputValue.value || array.length === 7}
            isLoader={loader.addTail}
          />
          <Button
            type="button"
            text="Удалить из head"
            linkedList="small"
            onClick={deleteHead}
            disabled={!array || array.length === 0}
            isLoader={loader.deleteHead}
          />
          <Button
            type="button"
            text="Удалить из tail"
            linkedList="small"
            onClick={deleteTail}
            disabled={!array || array.length === 0}
            isLoader={loader.deleteTail}
          />
           <Input
            type="number"
            placeholder="Введите индекс"
            name="index"
            min={0}
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
              loader.addIndex ||
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
               loader.deleteIndex ||
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
