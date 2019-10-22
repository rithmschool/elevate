import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import DashboardManage from "./dashboardManage";

it("renders without crashing", function() {
  shallow(<DashboardManage />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<DashboardManage />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
