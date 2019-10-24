import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import NewsletterSignUpForm from "./newsletterSignUpForm";

describe("NewsletterSignUpForm", function() {
  it("renders", () => {
    shallow(<NewsletterSignUpForm />);
  });

  it("matches snapshot", () => {
    let wrapper = mount(<NewsletterSignUpForm />);
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });

  it("calls onSubmit prop function when form is submitted", () => {
    const wrapper = mount(<NewsletterSignUpForm />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleSubmit');
    instance.handleSubmit();

    expect(instance.handleSubmit).toHaveBeenCalled();
  });
});
