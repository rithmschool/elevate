import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import UserInfoEditForm from "./UserInfoEditForm";

it("matches snapshot while loading", function () {

  let latestSalary ={
    user_id: 1,
    salary: 3000,
    bonus: 300,
    equity: 0.3,
  }
  let currentUser ={
    current_company: "Rithm",
    email: "test@gmail.com",
    first_name: "user",
    goals: 'goals',
    hire_date: "2019-08-13T07:00:00.000Z",
    is_admin: true,
    last_name: "test",
    needs: 'needs',
    userId: 1
  }

  let wrapper = shallow(<UserInfoEditForm currentUser={currentUser} latestSalary={latestSalary}/>);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("matches snapshot after loading", function () {
  let wrapper = shallow(<UserInfoEditForm latestSalary={{}} />);
  wrapper.setState({
    latestSalary: { user_id: 1, salary: 10000, bonus: 100, equity: 0.3}
  });
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
