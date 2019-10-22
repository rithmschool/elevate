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

  it('calls onSubmit prop function when form is submitted', () => {
    const onSubmitFn = jest.fn();
    const wrapper = mount(<NewsletterSignUpForm onSubmit={onSubmitFn}/>);
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmitFn).toHaveBeenCalledTimes(1);
  });
});
