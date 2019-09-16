import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import AdminNavbar from "./adminNavbar";

describe("AdminNavbar", function() {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AdminNavbar />);
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

  it("has a div for users, invoices, questions, and calendars", function() {
    expect(wrapper.find(".adminNavbar #users")).toHaveLength(1);
    expect(wrapper.find(".adminNavbar #invoices")).toHaveLength(1);
    expect(wrapper.find(".adminNavbar #questions")).toHaveLength(1);
    expect(wrapper.find(".adminNavbar #calendar")).toHaveLength(1);
  });

  it("calls handleClick", function() {
    const spy = jest.spyOn(wrapper.instance(), "handleClick");
    wrapper.setProps({ changeView: function changeView() {} });
    wrapper.find('div[id="users"]').simulate("click");

    expect(spy).toHaveBeenCalled();
  });
});
