import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import PrivateRoute from "./AdminPrivateRoute";

it("renders without crashing", function () {
  shallow(<PrivateRoute />);
});

it("matches snapshot", function () {
  let wrapper = shallow(<PrivateRoute />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
