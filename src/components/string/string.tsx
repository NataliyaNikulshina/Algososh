import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import stringStyle from './string.module.css';


export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };


  return (
    <SolutionLayout title="Строка">
     <form className={stringStyle.form} onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          value={inputValue}
          maxLength={11}
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={loader}
        />
      </form>
    </SolutionLayout>
  );
};
