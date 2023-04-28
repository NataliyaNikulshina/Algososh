import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sortStyle from "./sorting-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {
  const [loader, setLoader] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    
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
        />
      </form>
    </SolutionLayout>
  );
};
