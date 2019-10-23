import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import AdminNavbar from "./adminNavbar";

describe("AdminNavbar", function() {
  let wrapper;

  beforeEach(function() {
    wrapper = shallow(<AdminNavbar position={true} />);
  });

  it("renders without crashing", function() {
    shallow(<AdminNavbar />);
  });

  it("matches snapshot", function() {
    let serialized = toJson(wrapper);

    expect(serialized).toMatchSnapshot();
  });

  it("has div with admin-navbar class", function() {
    expect(wrapper.find("div.adminNavbar")).toHaveLength(1);
  });

  it("should be able to call toggle method when position is false", function() {
    const spy = jest.spyOn(wrapper.instance(), "toggle");

    wrapper.setProps({
      toggleSidebar: function toggleSidebar() {},
      position: false
    });

    wrapper.find(".adminNavbar").simulate("click");

    expect(spy).toHaveBeenCalled();
  });

  it("should display 'users' and 'questions' when position is true", function() {
    // wrapper.setProps({ position: true });

    expect(wrapper.find(".adminNavbar > p > #users")).toHaveLength(1);
    expect(wrapper.find(".adminNavbar > p > #questions")).toHaveLength(1);
  });
});
