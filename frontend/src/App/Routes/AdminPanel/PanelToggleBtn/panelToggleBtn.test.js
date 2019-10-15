import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import PanelToggleBtn from "./panelToggleBtn";

it("renders without crashing", function() {
  shallow(<PanelToggleBtn />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<PanelToggleBtn />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
