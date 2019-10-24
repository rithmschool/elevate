import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import DashboardTemplates from "./dashboardTemplates";

it("renders without crashing", function() {
  shallow(<DashboardTemplates />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<DashboardTemplates />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
