import React from "react";
import { mount } from "enzyme";
import { render, fireEvent, act } from "@testing-library/react";
import toJson from "enzyme-to-json";
import LoginSignUpForm from "./loginSignUpForm";
import { Form } from "react-bootstrap";

describe("LoginSignUpForm", function() {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<LoginSignUpForm />);
  });

  it("renders without crashing", function() {
    // Mounted in beforeEach above
  });

  it("matches snapshot", function() {
    const serialized = toJson(wrapper);

    expect(serialized).toMatchSnapshot();
  });

  it("renders 2 inputs on load", function() {
    expect(wrapper.find(Form.Control)).toHaveLength(2);
  });

  xit("fires loginorsignup function when 'create one' is clicked", async function() {});

  it("has the Google sign in button", function() {
    expect(wrapper.find("i.fa-google")).toHaveLength(1);
  });

  xit("Removes form and changes state to loading when submit is clicked", function() {
    // expect(wrapper.state().isLoading).toEqual(false);
    // const submit = wrapper.find("form").at(0);
    // submit.simulate("submit");
    // expect(wrapper.html()).toEqual('<div class="Spinner_loader"></div>');
    // expect(wrapper.state().isLoading).toEqual(true);
  });
});
