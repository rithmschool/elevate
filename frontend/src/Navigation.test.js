import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Navigation from "./Navigation";

it("renders without crashing", function () {
  shallow(<Navigation />);
});

it("matches snapshot", function () {
  let wrapper = shallow(<Navigation />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
