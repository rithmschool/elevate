import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Alert from "./Alert";

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
