import React from "react";
import Enzyme from "enzyme";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import UserSalaryInfoForm from "./userSalaryInfoForm";
import { Form } from "react-bootstrap";
import { render, fireEvent } from "@testing-library/react";

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

  it("renders all inputs", function() {
    expect(wrapper.find(Form.Control)).toHaveLength(3);
  });

  it("has correct initial state", function() {
    const { getByTestId } = render(<UserSalaryInfoForm {...latestSalary} />);
    const bonusInput = getByTestId("bonus");
    const salaryInput = getByTestId("salary");
    const equityInput = getByTestId("equity");

    expect(bonusInput.value).toBe("100");
    expect(salaryInput.value).toBe("50000");
    expect(equityInput.value).toBe("0.1");
  });

  it("changes values via the fireEvent.change method", function() {
    const { getByTestId } = render(<UserSalaryInfoForm {...latestSalary} />);
    const input = getByTestId("salary");
    fireEvent.change(input, { target: { value: "100000" } });
    expect(input.value).toBe("100000");
    fireEvent.change(input, { target: { value: "999" } });
    expect(input.value).toBe("999");
  });

  it("enables the form inputs when edit toggled on", function() {
    const { getByTestId } = render(<UserSalaryInfoForm {...latestSalary} />);
    const input = getByTestId("salary");
    const toggle = getByTestId("turnEditOn");
    fireEvent.click(toggle);
    expect(input.disabled).toBeFalsy();
  });

  it("disables the form inputs on submission", function() {
    const handleSalaryUpdate = jest.fn();
    const { getByTestId } = render(
      <UserSalaryInfoForm
        {...latestSalary}
        handleSalaryUpdate={handleSalaryUpdate}
      />
    );
    const input = getByTestId("salary");
    fireEvent.submit(input);
    expect(input.disabled).toBeTruthy();
  });

  it("disables the form inputs upon clicking cancel", function() {
    const handleSalaryUpdate = jest.fn();
    const { getByTestId } = render(
      <UserSalaryInfoForm
        {...latestSalary}
        handleSalaryUpdate={handleSalaryUpdate}
      />
    );
    const toggle = getByTestId("turnEditOn");
    const input = getByTestId("salary");
    fireEvent.click(toggle);
    expect(input.disabled).toBeFalsy();
    const cancel = getByTestId("cancel");
    fireEvent.click(cancel);
    expect(input.disabled).toBeTruthy();
  });

  it("calls handleSalaryUpdate on submission", function() {
    const handleSalaryUpdate = jest.fn();
    const { getByTestId } = render(
      <UserSalaryInfoForm
        {...latestSalary}
        handleSalaryUpdate={handleSalaryUpdate}
      />
    );
    const input = getByTestId("salary");
    fireEvent.submit(input);
    expect(handleSalaryUpdate).toBeCalledTimes(1);
  });
});
