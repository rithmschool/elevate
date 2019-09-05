import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import ResetPassword from "./ResetPassword";

it("renders without crashing", function () {
  shallow(<ResetPassword />);
});

it("matches snapshot", function () {
  let wrapper = shallow(<ResetPassword />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

describe('ResetPassword password form', function() {
  const match = { params: { token: '985644a4172d42907f0e9c8c3d5a95f6e0a6b316' } }
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<ResetPassword match={match}/>);
  });

  it('has states', function () {
    
    wrapper.setState({isLoading: false, userId:1, first_name: 'test'})
    expect(wrapper.state('userId')).toEqual(1);
    expect(wrapper.state('first_name')).toEqual('test');
    expect(wrapper.state('password')).toEqual('');
    expect(wrapper.state('confirmPassword')).toEqual('');
    expect(wrapper.state('updated')).toEqual(false);
    expect(wrapper.state('isLoading')).toEqual(false);
    expect(wrapper.state('errors')).toEqual([]);
    
  });

  it('test user entred matched passwords', function () {
    wrapper.setState({isLoading: false, userId:1, first_name: 'test'})

    expect(wrapper.find('h4').at(0).text()).toEqual('Hello test');

    wrapper.find('input').at(0).getDOMNode().value = 'pass';
    wrapper.find('input').at(0).simulate('change');

    wrapper.find('input').at(1).getDOMNode().value = 'pass';
    wrapper.find('input').at(1).simulate('change');

    wrapper.find('form').simulate('submit');

    expect(wrapper.state('password')).toEqual('pass');
    expect(wrapper.state('confirmPassword')).toEqual('pass');
    expect(wrapper.state('errors')).toEqual([]);
  });

  it('test user entred not matching passwords', function () {
    wrapper.setState({isLoading: false, userId:1, first_name: 'test'});

    expect(wrapper.find('h4').at(0).text()).toEqual('Hello test');

    wrapper.find('input').at(0).getDOMNode().value = 'pass';
    wrapper.find('input').at(0).simulate('change');

    wrapper.find('input').at(1).getDOMNode().value = 'ass';
    wrapper.find('input').at(1).simulate('change');

    wrapper.find('form').simulate('submit');

    expect(wrapper.state('password')).toEqual('pass');
    expect(wrapper.state('confirmPassword')).toEqual('ass');
    expect(wrapper.state('errors')).toEqual(["These passwords don't match. Try again?"]);
  });

  it('test password updated successfully', function () {
    wrapper.setState({isLoading: false, userId:1, first_name: 'test', updated: true});

    expect(wrapper.find('p').text()).toEqual('Password updated successfully!');
    expect(wrapper.find('a').text()).toEqual('Try to login again');
  });
});