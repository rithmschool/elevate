import React from "react";
import axios from "axios";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import mockData from "../../../mock_data";

const { USERS: users, QUESTIONS: questions } = mockData; 

import AdminPanel from "./adminPanel";

jest.mock("axios");

describe("AdminPanel", function() {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(<AdminPanel />);
    await wrapper.instance().componentDidMount();
    wrapper.setState({ users, questions });
  });

  it("renders without crashing", function() {
    shallow(<AdminPanel />);
  });

  it("matches snapshot", function() {
    const serialized = toJson(wrapper);

    expect(serialized).toMatchSnapshot();
  });

  it("has states", function() {
    expect(wrapper.state("view")).toEqual("");
    expect(wrapper.state("sideBarOpen")).toEqual(true);
    expect(wrapper.state("users")).toEqual(users);
    expect(wrapper.state("questions")).toEqual(questions);
    expect(wrapper.state("userDetail")).toEqual(null);
  });

  it("changes view state on click", function() {
    wrapper.find(".adminPanel_main #users").simulate("click");
    expect(wrapper.state("view")).toEqual("users");

    wrapper.find(".adminPanel_main #questions").simulate("click");
    expect(wrapper.state("view")).toEqual("questions");
  });

  it("show expected user data in the table", function() {
    wrapper.find("#users").simulate("click");
    wrapper.update();

    const rows = wrapper.find('table[id="users-table"]');

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


  it("has div with adminPanel_main class", function() {
    expect(wrapper.find("div.adminPanel_main")).toHaveLength(1);
  });

  it("has div with adminPanel_panel class", function() {
    expect(wrapper.find("div.adminPanel_main")).toHaveLength(1);
  });


  it("renders the users table when view state is users", function() {
    wrapper.find("#users").simulate("click");
    wrapper.update();

    expect(wrapper.find('table[id="users-table"]')).toHaveLength(1);
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
