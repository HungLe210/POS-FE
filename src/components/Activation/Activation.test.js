import React from "react";
import { shallow } from "enzyme";
import Activation from "./Activation";

describe("Activation", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Activation />);
    expect(wrapper).toMatchSnapshot();
  });
});
