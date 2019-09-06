import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import LoginSignUpForm from "./logInSignUpForm";

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

  it("has states", function() {
    expect(wrapper.state()).toEqual({
      errors: [],
      isLoading: false,
      isLogin: true,
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    });
  });

  it("changes isLogin state on click and shows additional form fields", function() {
    expect(wrapper.find('input[id="firstName"]')).toHaveLength(0);
    expect(wrapper.find('input[id="lastName"]')).toHaveLength(0);

    wrapper.find("button.button-signup").simulate("click");
    expect(wrapper.state("isLogin")).toEqual(false);

    wrapper.update();

    expect(wrapper.find('input[id="firstName"]')).toHaveLength(1);
    expect(wrapper.find('input[id="lastName"]')).toHaveLength(1);
  });

  it('has the Google sign in button', function () {
    expect(wrapper.find('i.fa-google')).toHaveLength(1);
  });

  it("Removes form and changes state to loading when submit is clicked", function() {
    expect(wrapper.state().isLoading).toEqual(false);
    const submit = wrapper.find("form").at(0);
    submit.simulate("submit");
    expect(wrapper.html()).toEqual('<div class="loader"></div>');
    expect(wrapper.state().isLoading).toEqual(true);
  });
});
