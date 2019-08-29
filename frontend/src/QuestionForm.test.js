import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import QuestionForm from "./QuestionForm";

it("renders without crashing", function () {
  shallow(<QuestionForm />);
});

it("matches snapshot", function () {
  let wrapper = shallow(<QuestionForm />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it('Should capture question correctly onChange', function () {
  const component = mount(<QuestionForm />);
  const input = component.find('textarea').at(0);
  input.instance().value = 'This is a test question?';
  input.simulate('change');
  expect(component.state().inputs.question).toEqual('This is a test question?');
})

it('Should capture email correctly onChange', function () {
  const component = mount(<QuestionForm />);
  const input = component.find('input').at(0);
  input.instance().value = 'test@gmail.com';
  input.simulate('change');
  expect(component.state().inputs.email).toEqual('test@gmail.com');
})

// TODO: Simulate a submit and make sure the validation passes and the thank you message appears.

// it('should submit, pass validation, and return a thanks message', function () {
//   const component = mount(<QuestionForm />);

//   const emailInput = component.find('input').at(0);
//   emailInput.instance().value = 'test@gmail.com';
//   emailInput.simulate('change');

//   const questionInput = component.find('textarea').at(0);
//   questionInput.instance().value = 'This is a test question?';
//   questionInput.simulate('change');

//   const form = component.find('form');
//   form.simulate('submit');
// expect(component.state().questionSubmitted).toEqual(true);

// });