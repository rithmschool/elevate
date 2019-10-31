import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import AdminUserView from "./adminUserView";
import ElevateApi from "../../../../elevateApi";

describe("AdminUserView", function() {
  let wrapper;
  const testData = {
    first_name: "Han",
    last_name: "Solo",
    email: "han@solo.com",
    current_company: "SpaceX",
    hire_date: "2018-09-01",
    needs: "Negotiate a raise during annual review",
    goals: "Increase salary by 15k",
    id: 1
  };

  beforeEach(function() {
    ElevateApi.getUser = jest.fn(() => testData);
    wrapper = mount(
      <AdminUserView.WrappedComponent
        history={{ location: { pathname: "/admin/users/1" } }}
        match={{ params: { userId: 1 } }}
      />
    );
  });

  it("renders without crashing", function() {
    shallow(<AdminUserView.WrappedComponent />);
  });

  it("matches snapshot", function() {
    const serialized = toJson(wrapper);

    expect(serialized).toMatchSnapshot();
  });

  it("makes API call upon mounting", function() {
    expect(ElevateApi.getUser).toHaveBeenCalled();
  });

  it("has user state", function() {
    expect(wrapper.state("user")).toEqual(testData);
  });

  it("has div with adminUserView_div class", function() {
    expect(wrapper.find("div.adminUserView_div")).toHaveLength(1);
  });

  it("has user info fields", function() {
    expect(wrapper.html()).toContain("Email");
    expect(wrapper.html()).toContain("Company");
    expect(wrapper.html()).toContain("Hire Date");
    expect(wrapper.html()).toContain("Needs");
    expect(wrapper.html()).toContain("Goals");
    expect(wrapper.html()).toContain("Questions");
  });

  it("renders confirmation when clicking delete button", function() {
    window.confirm = jest.fn(() => true);
    const deleteBtn = wrapper.find("#delete-click").first();
    deleteBtn.simulate("click");
    expect(window.confirm).toHaveBeenCalled();
  });
});
