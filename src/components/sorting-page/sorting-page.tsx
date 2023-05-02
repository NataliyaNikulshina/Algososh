import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sortStyle from "./sorting-page.module.css"
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { randomArr } from "../../utils/randomArr";
import { ElementStates } from "../../types/element-states";
import { TArrColumn } from "../../types/arr-column";
import { nanoid } from "nanoid";
import { swap } from "../../utils/swap";

export const SortingPage: FC = () => {
  const [loader, setLoader] = useState(false);
  const [arr, setArr] = useState<TArrColumn[]>(randomArr(3,17));
  const [radioValue, setRadioValue] = useState<"selection" | "bubble">("selection");;

  const handleSortArr = (type: Direction) =>{
    //console.log(type);
    setLoader(true);
    if (radioValue === "selection") {
      selectionSort(arr, type);
    } else {
      bubbleSort(arr, type);
    }
    setLoader(false);
  }

  const selectionSort = async (arr: TArrColumn[], type: Direction) =>{
    //console.log(type, arr);
    for (let i = 0; i < arr.length; i++) {
      let maxInd = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArr([...arr]);
        await new Promise<void>((res) => setTimeout(res, 1000));
        if (type === Direction.Ascending ? arr[j].num < arr[maxInd].num : arr[j].num > arr[maxInd].num) {
          maxInd = j;
        }
        arr[i].color = ElementStates.Default;
        arr[j].color = ElementStates.Default;
        setArr([...arr]);
      }
      ([arr[i], arr[maxInd]] = [arr[maxInd],arr[i]]);
      arr[i].color = ElementStates.Modified;
    }
    setArr([...arr]);
  }

  const bubbleSort = async (arr: TArrColumn[], type: Direction) =>{
    //console.log(type, arr);
    for (let i=0; i < arr.length; i++){
      for (let j=0; j < arr.length - i - 1; j++){
        arr[j].color = ElementStates.Changing;
        arr[j+1].color = ElementStates.Changing;
        setArr([...arr]);
        await new Promise<void>((res) => setTimeout(res, 1000));
        if (type === Direction.Ascending ? arr[j].num > arr[j+1].num : arr[j].num < arr[j+1].num) {
          ([arr[j], arr[j+1]] = [arr[j+1],arr[j]]);  
        };
        arr[j].color = ElementStates.Default;
       // arr[i-1].color = ElementStates.Modified;
      }
      arr[arr.length - i - 1].color = ElementStates.Modified;
    }
    setArr([...arr]);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={sortStyle.form} >
        <div className={sortStyle.wrapper}>
          <RadioInput 
            label = "Выбор" 
            extraClass={sortStyle.radio}
            value={"selection"} 
            name={"sort"}
            disabled={loader}
            onChange={()=>setRadioValue("selection")}
            checked={radioValue==="selection"}
          />
          <RadioInput 
            label = "Пузырек" 
            extraClass={sortStyle.radio}
            value={"bubble"} 
            name={"sort"}
            disabled={loader}
            onChange={()=>setRadioValue("bubble")}
            checked={radioValue==="bubble"}
          />
          <Button
            text="По возрастанию"
            isLoader={loader}
            extraClass={sortStyle.button}
            sorting={Direction.Ascending}
            onClick={() => handleSortArr(Direction.Ascending)}
            //disabled={!inputVal}
          />
          <Button
            text="По убыванию"
            isLoader={loader}
            extraClass={sortStyle.button}
            sorting={Direction.Descending}
            onClick={() => handleSortArr(Direction.Descending)}
            //disabled={!inputVal}
          />
        </div>
        <Button
          text="Новый массив"
          isLoader={loader}
          linkedList="small"
          //disabled={!inputVal}
          onClick={()=> setArr(randomArr(3,17))}
        />
      </form>
      <ul className={sortStyle.list}>
        {arr && arr.map(({num, color}, index) => (
          <li key={index}>
            <Column key={nanoid()} index={num} state={color} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
