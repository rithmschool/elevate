import React from "react";
import { MemoryRouter } from "react-router-dom";
import { shallow, mount } from "enzyme";
import mockData from "../../../../../mock_data";
import AdminPanel from "./adminPanel";
import AdminTable from "./AdminTable/adminTable";
import ElevateApi from "../../../elevateApi";

const { USERS, QUESTIONS } = mockData;
const users = USERS;
const questions = QUESTIONS;

describe("AdminPanel", function() {
  let wrapper;

  beforeEach(async () => {
    ElevateApi.getUsers = jest.fn(() => users);
    ElevateApi.getQuestions = jest.fn(() => questions);
    wrapper = mount(
      <MemoryRouter initialEntries={["/admin/users"]}>
        <AdminPanel
          history={{ location: { pathname: "/admin/users" } }}
          match={{ params: {} }}
        />
      </MemoryRouter>
    );
    wrapper.find(AdminPanel).setState({ users, questions });
  });

  it("renders without crashing", function() {
    shallow(<AdminPanel />);
  });

  it("makes API calls upon mounting", function() {
    expect(ElevateApi.getUsers).toHaveBeenCalled();
    expect(ElevateApi.getQuestions).toHaveBeenCalled();
  });

  it("toggles admin navbar on clicking toggle button", function() {
    const toggleBtn = wrapper.find("#adminPanel_toggleBtn");
    toggleBtn.simulate("click");
    expect(wrapper.find(AdminPanel).state("sideBarOpen")).toBe(false);
    toggleBtn.simulate("click");
    expect(wrapper.find(AdminPanel).state("sideBarOpen")).toBe(true);
  });

  it("has states", function() {
    let panel = wrapper.find(AdminPanel);
    expect(panel.state("sideBarOpen")).toEqual(true);
    expect(panel.state("users")).toEqual(users);
    expect(panel.state("questions")).toEqual(questions);
  });

  it("renders AdminPanel and AdminTable components", function() {
    wrapper.find(AdminPanel).setState({ users, questions });
    expect(wrapper.find(AdminPanel)).toHaveLength(1);
  });

  it("has div with adminPanel_main class", function() {
    expect(wrapper.find("div.adminPanel_main")).toHaveLength(1);
  });

  it("has div with adminPanel_panel class", function() {
    expect(wrapper.find("div.adminPanel_main")).toHaveLength(1);
  });
});
