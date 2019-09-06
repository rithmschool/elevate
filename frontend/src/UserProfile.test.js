import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import UserProfile from "./userProfile";

it("renders without crashing", function() {
  shallow(<UserProfile />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<UserProfile />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

describe("UserProfile", function() {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<UserProfile />);
  });

  it("has states", function() {
    expect(wrapper.state("hasSalaryRecord")).toEqual(true);
    expect(wrapper.state("lastestSalary")).toEqual(null);
    expect(wrapper.state("isLoading")).toEqual(true);
    expect(wrapper.state("errors")).toHaveLength(0);
    expect(wrapper.state("saveConfirmed")).toEqual(false);
  });

  it("test render  div container class...", function() {
    wrapper.setState({ isLoading: false });
    expect(wrapper.find("div.container")).toHaveLength(3);
  });
});
