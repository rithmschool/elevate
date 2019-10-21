import React from "react";
import Enzyme from "enzyme";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import UserSalaryInfoForm from "./userSalaryInfoForm";
import { Form } from "react-bootstrap";
import { render, fireEvent } from "@testing-library/dom";

describe("UserSalaryInfoForm", function() {
  let wrapper;

  let latestSalary = {
    user_id: 1,
    salary: 50000,
    bonus: 100,
    equity: 0.1
  };

  beforeEach(() => {
    wrapper = mount(<UserSalaryInfoForm {...latestSalary} />);
  });

  it("renders without crashing", function() {
    shallow(<UserSalaryInfoForm {...latestSalary} />);
  });

  it("shows my default text", () => {
    expect(wrapper.find("h3").text()).toEqual("Salary info");
  });

  it("matches snapshot", function() {
    let wrapper = shallow(<UserSalaryInfoForm />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });

  it("renders all inputs", function(){
    expect(wrapper.find(Form.Control)).toHaveLength(3);
  })
});
