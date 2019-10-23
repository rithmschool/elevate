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
    expect(wrapper.find(AdminTable)).toHaveLength(1);
  });

  it("shows expected user data in the table", function() {
    const rows = wrapper.find(".table").last();

    expect(rows.length).toEqual(1);

    const dataRow = rows
      .first()
      .find("td")
      .map(column => column.text());

    expect(dataRow.length).toEqual(16);

    expect(dataRow[0]).toEqual("user1@mail.com");
    expect(dataRow[1]).toEqual("first_name1");
    expect(dataRow[2]).toEqual("last_name1");
    expect(dataRow[3]).toEqual("");
    expect(dataRow[4]).toEqual("company1");
    expect(dataRow[5]).toEqual("2018-06-23T07:00:00.000Z");
    expect(dataRow[6]).toEqual("needs1");
    expect(dataRow[7]).toEqual("goals1");
  });

  // it("renders new component on click", function() {
  //   wrapper.find("td").first().simulate("click");
  //   expect(wrapper.find("td").first().onClick()).toBeCalledTimes(1);
  // });

  it("has div with adminPanel_main class", function() {
    expect(wrapper.find("div.adminPanel_main")).toHaveLength(1);
  });

  it("has div with adminPanel_panel class", function() {
    expect(wrapper.find("div.adminPanel_main")).toHaveLength(1);
  });
});

// appointments have been removed from the admin panel for now.

// let appointments = [
//   {
//     id: 1,
//     user_id: id,
//     first_name: "user",
//     last_name: "test",
//     email: "user@test.com",
//     created_at: "2019-11-11",
//     event_type: "One-on-One",
//     event_name: "30 Minute Meeting",
//     start_time_pretty: "2019-11-13",
//     location: "Zoom",
//     canceled: false
//   }
// ];

// it("renders the questions table when view state is questions", function() {
//   wrapper.find('div[id="questions"]').simulate("click");
//   wrapper.update();

//   expect(wrapper.find('table[id="questions-table"]')).toHaveLength(1);
// });

// it("show expected question data in the table", function() {
//   wrapper.setState({ questions });
//   wrapper.find('div[id="questions"]').simulate("click");
//   wrapper.update();

//   const rows = wrapper.find('table[id="questions-table"]');
//   expect(rows.length).toEqual(1);

//   const dataRow = rows
//     .first()
//     .find("td")
//     .map(column => column.text());
//   expect(dataRow.length).toEqual(8);
//   expect(dataRow[2]).toEqual("My employer didn't pay me");
//   expect(dataRow[3]).toEqual("");

//   expect(dataRow[4]).toEqual("user@test.com");
//   expect(dataRow[5]).toEqual("user");
//   expect(dataRow[6]).toEqual("test");
//   expect(dataRow[7]).toEqual("2019-08-29");
// });
