import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import fibStyle from "./fibonacci-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { getFibonacci } from "../../utils/fibonacci";

export const FibonacciPage: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [loader, setLoader] = useState(false);
  const [arr, setArr] = useState<number[]>([]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fib = getFibonacci(Number(inputVal));
    console.log(fib);
    setLoader(true);
    for (let i=0; i<fib.length; i++){
      await new Promise<void>((res) => setTimeout(res, 500));
      setArr(fib.slice(0, i + 1));
    }
    setLoader(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={fibStyle.form} onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          value={inputVal}
          max={19}
          min={1}
          isLimitText={true}
          type = "number"
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={loader}
          linkedList="small"
          disabled={!inputVal || Number(inputVal)>19 || Number(inputVal)<1}
        />
      </form>
      <ul className={fibStyle.list}>
        {arr.map((num, index) => (
          <li key={index}>
            <Circle letter={num.toString()} index={index} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
