import React from "react";
import { shallow } from "enzyme";
import PasswordForgot from "./PasswordForgot";

describe("PasswordForgot", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PasswordForgot />);
    expect(wrapper).toMatchSnapshot();
  });
});
