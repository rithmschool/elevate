import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import DashboardAppointments from "./dashboardAppointments";

it("renders without crashing", function() {
  shallow(<DashboardAppointments />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<DashboardAppointments />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
