import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import AskAnExpert from "./AskAnExpert";

describe("AdminPanel", function() {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AskAnExpert />);
  });

  it("renders without crashing", function() {
    // Mounted in beforeEach above
  });

  it("matches snapshot", function() {
    const serialized = toJson(wrapper);

    expect(serialized).toMatchSnapshot();
  });

  it("to have Ask an expert text", function() {
    expect(wrapper.find("h1").text()).toEqual("Ask an expert");
  });
});
