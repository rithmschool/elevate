import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Dashboard from "./dashboard";

it("renders without crashing", function() {
  shallow(<Dashboard />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<Dashboard />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
