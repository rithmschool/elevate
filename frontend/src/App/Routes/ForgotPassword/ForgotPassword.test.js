import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import ForgotPassword from "./forgotPassword";

it("renders without crashing", function() {
  shallow(<ForgotPassword />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<ForgotPassword />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

describe("Forgot password form", function() {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<ForgotPassword />);
  });

  it("has states", function() {
    expect(wrapper.state("email")).toEqual("");
    expect(wrapper.state("errors")).toEqual([]);
    expect(wrapper.state("emailSent")).toEqual(false);
  });

  it("test user entred an email", function() {
    wrapper.find("input").getDOMNode().value = "test@test.com";
    wrapper.find("input").simulate("change");
    wrapper.find("form").simulate("submit");

    expect(wrapper.state("email")).toEqual("test@test.com");
  });

  it('test user didn"t enter an email and try to submit', function() {
    wrapper.find("form").simulate("submit");
    expect(wrapper.state("errors")).toEqual([
      "Please enter your email address!"
    ]);
  });
});
