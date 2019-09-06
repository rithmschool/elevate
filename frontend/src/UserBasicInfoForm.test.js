import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import UserBasicInfoForm from "./userBasicInfoForm";

it("renders without crashing", function() {
  shallow(<UserBasicInfoForm />);
});

it("matches snapshot", function() {
  let currentUser = {
    current_company: "Rithm",
    email: "test@gmail.com",
    first_name: "user",
    hire_date: "2019-08-13",
    last_name: "test"
  };
  let wrapper = shallow(<UserBasicInfoForm {...currentUser} />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

describe("UserSalaryInfoForm", function() {
  let wrapper;
  let currentUser = {
    current_company: "Rithm",
    email: "test@gmail.com",
    first_name: "user",
    hire_date: "2019-08-13",
    last_name: "test"
  };
  beforeEach(() => {
    wrapper = mount(<UserBasicInfoForm {...currentUser} />);
  });

  it("has states", function() {
    expect(wrapper.state("first_name")).toEqual("user");
    expect(wrapper.state("last_name")).toEqual("test");
    expect(wrapper.state("email")).toEqual("test@gmail.com");
    expect(wrapper.state("current_company")).toEqual("Rithm");
    expect(wrapper.state("hire_date")).toEqual("2019-08-13");
    expect(wrapper.state("isEdit")).toEqual(false);
  });

  it("changes isEdit state to true whem click on edit", function() {
    wrapper.find("i.fa-edit").simulate("click");
    expect(wrapper.state("isEdit")).toEqual(true);
  });
});
