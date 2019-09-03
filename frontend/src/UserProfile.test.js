
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import UserProfile from "./UserProfile";

it("renders without crashing", function () {
  shallow(<UserProfile />);
});

it("matches snapshot", function () {
  let wrapper = shallow(<UserProfile />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
