import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { render, fireEvent } from "@testing-library/react";
import { Form } from "react-bootstrap";
import UserBasicInfoForm from "./userBasicInfoForm";

describe("UserBasicInfoForm", function() {
  let wrapper;
  let currentUser = {
    current_company: "Rithm",
    email: "test@gmail.com",
    first_name: "user",
    hire_date: "2019-08-13",
    last_name: "test"
  };

  beforeEach(function() {
    wrapper = mount(<UserBasicInfoForm {...currentUser} />);
  });

  it("renders without crashing", function() {
    render(<UserBasicInfoForm {...currentUser} />);
  });

  it("matches snapshot", function() {
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });

  it("renders all inputs", function() {
    expect(wrapper.find(Form.Control)).toHaveLength(5);
  });

  it("renders correct initial state in form", function() {
    const { getByTestId } = render(<UserBasicInfoForm {...currentUser} />);
    const firstNameInput = getByTestId("firstName");
    const lastNameInput = getByTestId("lastName");
    const emailInput = getByTestId("email");
    const companyInput = getByTestId("currentCompany");
    const hireDateInput = getByTestId("hireDate");
    expect(firstNameInput.value).toBe("user");
    expect(lastNameInput.value).toBe("test");
    expect(emailInput.value).toBe("test@gmail.com");
    expect(companyInput.value).toBe("Rithm");
    expect(hireDateInput.value).toBe("2019-08-13");
  });

  it("changes values via the fireEvent.change method", function() {
    const { getByTestId } = render(<UserBasicInfoForm {...currentUser} />);
    const input = getByTestId("firstName");
    fireEvent.change(input, { target: { value: "a" } });
    expect(input.value).toBe("a");
    fireEvent.change(input, { target: { value: "aladdin" } });
    expect(input.value).toBe("aladdin");
  });

  it("enables the form inputs when edit toggled on", function() {
    const { getByTestId } = render(<UserBasicInfoForm {...currentUser} />);
    const input = getByTestId("firstName");
    const toggle = getByTestId("turnEditOn");
    fireEvent.click(toggle);
    expect(input.disabled).toBeFalsy();
  });

  it("disables the form inputs on submission", function() {
    const handleUserUpdate = jest.fn();
    const { getByTestId } = render(
      <UserBasicInfoForm {...currentUser} handleUserUpdate={handleUserUpdate} />
    );
    const input = getByTestId("firstName");
    fireEvent.submit(input);
    expect(input.disabled).toBeTruthy();
  });

  it("disables the form inputs upon clicking cancel", function() {
    const handleUserUpdate = jest.fn();
    const { getByTestId } = render(
      <UserBasicInfoForm {...currentUser} handleUserUpdate={handleUserUpdate} />
    );
    const toggle = getByTestId("turnEditOn");
    const input = getByTestId("firstName");
    fireEvent.click(toggle);
    expect(input.disabled).toBeFalsy();
    const cancel = getByTestId("cancel");
    fireEvent.click(cancel);
    expect(input.disabled).toBeTruthy();
  });

  it("calls handleUserUpdate on submission", function() {
    const handleUserUpdate = jest.fn();
    const { getByTestId } = render(
      <UserBasicInfoForm {...currentUser} handleUserUpdate={handleUserUpdate} />
    );
    const input = getByTestId("firstName");
    fireEvent.submit(input);
    expect(handleUserUpdate).toBeCalledTimes(1);
  });
});
