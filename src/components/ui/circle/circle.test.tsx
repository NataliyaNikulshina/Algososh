import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Circle", () => {

    it("Корректная отрисовка circle без буквы", () => {
      const circle = renderer.create(<Circle letter="" />).toJSON();
      expect(circle).toMatchSnapshot();
    });

    it("Корректная отрисовка circle с буквами", () => {
        const circle = renderer.create(<Circle letter="text"/>).toJSON();
        expect(circle).toMatchSnapshot();
    });

    it("Корректная отрисовка circle с head", () => {
        const circle = renderer.create(<Circle head="head"/>).toJSON();
        expect(circle).toMatchSnapshot();
    });

    it("Корректная отрисовка circle с tail", () => {
        const circle = renderer.create(<Circle tail="tail"/>).toJSON();
        expect(circle).toMatchSnapshot();
    });

    it("Корректная отрисовка circle с react-элементом в head", () => {
        const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
        expect(circle).toMatchSnapshot();
    });

    it("Корректная отрисовка circle с react-элементом в tail", () => {
        const circle = renderer.create(<Circle tail={<Circle />}/>).toJSON();
        expect(circle).toMatchSnapshot();
    });

    it("Корректная отрисовка circle с пропом isSmall ===  true", () => {
        const circle = renderer.create(<Circle isSmall={true}/>).toJSON();
        expect(circle).toMatchSnapshot();
    });

    it("Корректная отрисовка circle в состоянии default", () => {
        const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
        expect(circle).toMatchSnapshot();
    });

    it("Корректная отрисовка circle в состоянии changing", () => {
        const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
        expect(circle).toMatchSnapshot();
    });

    it("Корректная отрисовка circle в состоянии modified", () => {
        const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
        expect(circle).toMatchSnapshot();
    });

});