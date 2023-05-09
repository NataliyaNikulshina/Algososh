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
import { setDelay } from "../../utils/setDelay";
import { DELAY_IN_MS } from "../../constants/delays";
import { MAX_LENGTH_RANDOM_ARR, MIN_LENGTH_RANDOM_ARR } from "../../constants/element-captions";

export const SortingPage: FC = () => {
  const [loader, setLoader] = useState({
    ascending: false,
    descending: false,
    addNewArr: false,
    disabled: false,
    loader: false
  });
  const [arr, setArr] = useState<TArrColumn[]>(randomArr(MIN_LENGTH_RANDOM_ARR, MAX_LENGTH_RANDOM_ARR));
  const [radioValue, setRadioValue] = useState<"selection" | "bubble">("selection");;

  const handleSortArr = (type: Direction) =>{
    type === Direction.Ascending ? setLoader({ ...loader, disabled: true, ascending: true, loader: true }) : setLoader({ ...loader, disabled: true, descending: true, loader: true });
    if (radioValue === "selection") {
      selectionSort(arr, type);
    } else {
      bubbleSort(arr, type);
    }
  }

  const selectionSort = async (arr: TArrColumn[], type: Direction) =>{
    //console.log(type, arr);
    for (let i = 0; i < arr.length; i++) {
      let maxInd = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArr([...arr]);
        await setDelay(DELAY_IN_MS);
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
    type === Direction.Ascending ? setLoader({ ...loader, disabled: false, ascending: false, loader: false }) : setLoader({ ...loader, disabled: false, descending: false, loader: false});
  }

  const bubbleSort = async (arr: TArrColumn[], type: Direction) =>{
    //console.log(type, arr);
    for (let i=0; i < arr.length; i++){
      for (let j=0; j < arr.length - i - 1; j++){
        arr[j].color = ElementStates.Changing;
        arr[j+1].color = ElementStates.Changing;
        setArr([...arr]);
        await setDelay(DELAY_IN_MS);
        if (type === Direction.Ascending ? arr[j].num > arr[j+1].num : arr[j].num < arr[j+1].num) {
          ([arr[j], arr[j+1]] = [arr[j+1],arr[j]]);  
        };
        arr[j].color = ElementStates.Default;
      }
      arr[arr.length - i - 1].color = ElementStates.Modified;
    }
    setArr([...arr]);
    type === Direction.Ascending ? setLoader({ ...loader, disabled: false, ascending: false, loader: false }) : setLoader({ ...loader, disabled: false, descending: false, loader: false});
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
            disabled={loader.loader}
            onChange={()=>setRadioValue("selection")}
            checked={radioValue==="selection"}
          />
          <RadioInput 
            label = "Пузырек" 
            extraClass={sortStyle.radio}
            value={"bubble"} 
            name={"sort"}
            disabled={loader.loader}
            onChange={()=>setRadioValue("bubble")}
            checked={radioValue==="bubble"}
          />
          <Button
            text="По возрастанию"
            isLoader={loader.ascending}
            extraClass={sortStyle.button}
            sorting={Direction.Ascending}
            onClick={() => handleSortArr(Direction.Ascending)}
            disabled={loader.disabled}
          />
          <Button
            text="По убыванию"
            isLoader={loader.descending}
            extraClass={sortStyle.button}
            sorting={Direction.Descending}
            onClick={() => handleSortArr(Direction.Descending)}
            disabled={loader.disabled}
          />
        </div>
        <Button
          text="Новый массив"
          isLoader={loader.addNewArr}
          linkedList="small"
          disabled={loader.disabled}
          onClick={()=> setArr(randomArr(MIN_LENGTH_RANDOM_ARR, MAX_LENGTH_RANDOM_ARR))}
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
