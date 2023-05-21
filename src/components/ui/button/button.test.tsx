import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
    it("Корректная отрисовка кнопки с текстом", () => {
      const button = renderer.create(<Button text="Развернуть" />).toJSON();
      expect(button).toMatchSnapshot();
    });

    it("Корректная отрисовка кнопки без текста", () => {
        const button = renderer.create(<Button text="" />).toJSON();
        expect(button).toMatchSnapshot();
      });

    it("Корректная отрисовка задизейбленной кнопки", () => {
        const button = renderer.create(<Button disabled />).toJSON();
        expect(button).toMatchSnapshot();
      });

    it("Корректная отрисовка кнопки с лоудером", () => {
        const button = renderer.create(<Button isLoader />).toJSON();
        expect(button).toMatchSnapshot();
      });

    it("Корректная отрисовка кнопки с типом 'submit' ", () => {
        const button = renderer.create(<Button type="submit" />).toJSON();
        expect(button).toMatchSnapshot();
      });

    it("Корректная отрисовка кнопки с типом 'button' ", () => {
        const button = renderer.create(<Button type="button" />).toJSON();
        expect(button).toMatchSnapshot();
      });

    it("Корректность вызова колбека при клике на кнопку", () => {
        window.alert = jest.fn();
        render(<Button text="Добавить" onClick={() => alert("Тест!")} />);
        const button = screen.getByText("Добавить");
        fireEvent.click(button);
        expect(window.alert).toHaveBeenCalledWith("Тест!");
      });
});