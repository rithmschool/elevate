import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import UserSalaryInfoForm from "./UserSalaryInfoForm";

it("renders without crashing", function () {
  shallow(<UserSalaryInfoForm />);
});

it("matches snapshot", function () {

  let wrapper = shallow(<UserSalaryInfoForm />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

describe('UserSalaryInfoForm', function() {
  let wrapper;
  let lastestSalary ={
    user_id: 1,
    salary: 50000, 
    bonus: 100,
    equity: 0.1,
  }
  beforeEach(() => {
    wrapper = mount(<UserSalaryInfoForm {...lastestSalary} />);
  });

  it('has states', function () {
    expect(wrapper.state('user_id')).toEqual(1);
    expect(wrapper.state('salary')).toEqual(50000);
    expect(wrapper.state('bonus')).toEqual(100);
    expect(wrapper.state('equity')).toEqual(0.1);
    expect(wrapper.state('isEdit')).toEqual(false);
  });

  it('changes isEdit state to true whem click on edit', function () {

    wrapper.find('i.fa-edit').simulate('click');
    expect(wrapper.state('isEdit')).toEqual(true);
  });
});