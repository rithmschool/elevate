import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Logout from "./logout";

describe("Logout", function() {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Logout history={[]} checkToken={function checkToken() {}} />
    );
  });

  it("renders without crashing", function() {
    // Mounted in beforeEach above
  });

  it("matches snapshot", function() {
    const serialized = toJson(wrapper);

    expect(serialized).toMatchSnapshot();
  });

  it("has props", function() {
    expect("history" in wrapper.props()).toEqual(true);
    expect("checkToken" in wrapper.props()).toEqual(true);
  });
});
