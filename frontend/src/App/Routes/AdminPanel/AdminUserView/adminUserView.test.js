import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import AdminUserView from "./adminUserView";

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
    wrapper = mount(
      <AdminUserView.WrappedComponent
        history={{ location: { pathname: "/admin/users/1" } }}
        match={{ params: { userId: 1 } }}
      />
    );
    wrapper
      .find(AdminUserView.WrappedComponent)
      .first()
      .setState({ user: testData });
  });

  it("renders without crashing", function() {
    shallow(<AdminUserView.WrappedComponent />);
  });

  it("matches snapshot", function() {
    const serialized = toJson(wrapper);

    expect(serialized).toMatchSnapshot();
  });

  it("has user state", function() {
    expect(
      wrapper
        .find(AdminUserView.WrappedComponent)
        .first()
        .state("user")
    ).toEqual(testData);
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
});
