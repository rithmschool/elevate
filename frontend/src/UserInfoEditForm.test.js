import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import UserInfoEditForm from "./UserInfoEditForm";

it("renders without crashing", function () {
  shallow(<UserInfoEditForm />);
});

it("matches snapshot", function () {
  let wrapper = shallow(<UserInfoEditForm />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
