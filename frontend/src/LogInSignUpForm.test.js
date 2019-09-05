import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import LoginSignUpForm from './LoginSignUpForm';

describe('LoginSignUpForm', function() {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<LoginSignUpForm />);
  });

  it('renders without crashing', function () {
    // Mounted in beforeEach above
  });
  
  it('matches snapshot', function () {
    const serialized = toJson(wrapper);

    expect(serialized).toMatchSnapshot();
  });

  it('has states', function () {
    expect(wrapper.state('isLogin')).toEqual(true);
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
    expect(wrapper.state('firstName')).toEqual('');
    expect(wrapper.state('lastName')).toEqual('');
  });

  it('has div with form-container class', function () {
    expect(wrapper.find('div.form-container')).toHaveLength(1);
  });

  it('changes isLogin state on click and shows additional form fields', function () {
    expect(wrapper.find('input[id="firstName"]')).toHaveLength(0);
    expect(wrapper.find('input[id="lastName"]')).toHaveLength(0);

    wrapper.find('button.button-signup').simulate('click');
    expect(wrapper.state('isLogin')).toEqual(false);

    wrapper.update();

    expect(wrapper.find('input[id="firstName"]')).toHaveLength(1);
    expect(wrapper.find('input[id="lastName"]')).toHaveLength(1);
  });

  it('has the Google sign in button', function () {
    expect(wrapper.find('i.fa-google')).toHaveLength(1);
  });


});