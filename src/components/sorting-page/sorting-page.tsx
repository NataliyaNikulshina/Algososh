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

export const SortingPage: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [arr, setArr] = useState<TArrColumn[]>(randomArr());
  const [radioValue, setRadioValue] = useState("selectionSort");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };



  return (
    <SolutionLayout title="Сортировка массива">
      <form className={sortStyle.form} onSubmit={onSubmit}>
        <div className={sortStyle.wrapper}>
          <RadioInput label = "Выбор" extraClass={sortStyle.radio}/>
          <RadioInput label = "Пузырек" extraClass={sortStyle.radio}/>
          <Button
            text="По возрастанию"
            isLoader={loader}
            extraClass={sortStyle.button}
            sorting={Direction.Ascending}
            //disabled={!inputVal}
          />
          <Button
            text="По убыванию"
            isLoader={loader}
            extraClass={sortStyle.button}
            sorting={Direction.Descending}
            //disabled={!inputVal}
          />
        </div>
        <Button
          text="Новый массив"
          isLoader={loader}
          linkedList="small"
          //disabled={!inputVal}
          onClick={()=> setArr(randomArr())}
        />
      </form>
      <ul className={sortStyle.list}>
        {arr && arr.map(({num, color}, index) => (
          <li key={index}>
            <Column index={num} state={color} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
