import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Alert from "./alert";

it("renders without crashing", function() {
  shallow(<Alert />);
});

it("matches snapshot for danger", function() {
  let messages = ["Everything is broken", "Run for the hills"];
  let wrapper = shallow(<Alert type="danger" messages={messages} />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("matches snapshot for success", function() {
  let messages = ["Everything is awesome!"];
  let wrapper = shallow(<Alert type="success" messages={messages} />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

describe("Test error messages", function() {
  let wrapper;
  let messages = ["Everything is broken"];
  beforeEach(() => {
    wrapper = mount(<Alert type="danger" messages={messages} />);
  });

  it("render the props", function() {
    expect(wrapper.find("div.alert-danger")).toHaveLength(1);
    expect(wrapper.find("p.small")).toHaveLength(1);
    expect(wrapper.find("p").text()).toEqual("Everything is broken");
  });
});

describe("Test success messages", function() {
  let wrapper;
  let messages = ["Everything is awesome!"];
  beforeEach(() => {
    wrapper = mount(<Alert type="success" messages={messages} />);
  });

  it("render the props", function() {
    expect(wrapper.find("div.alert-success")).toHaveLength(1);
    expect(wrapper.find("p.small")).toHaveLength(1);
    expect(wrapper.find("p").text()).toEqual("Everything is awesome!");
  });
});
