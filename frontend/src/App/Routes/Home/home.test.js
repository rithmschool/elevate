import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Home from "./home";

it("renders without crashing", function() {
  shallow(<Home />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<Home />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

//TODO: make test for `Get Started` button routes  