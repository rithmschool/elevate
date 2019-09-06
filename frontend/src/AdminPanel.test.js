import React from "react";
import axios from "axios";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import AdminPanel from "./adminPanel";

jest.mock("axios");
const users = {
  data: {
    users: [
      {
        first_name: "Test",
        last_name: "User",
        company: "Google",
        hire_date: "2018-06-23T07:00:00.000Z",
        needs: "Talk to financial advisor about salary/equity negotiations.",
        goals: "Increase in equity."
      },
      {
        first_name: "Admin",
        last_name: "User",
        company: "",
        hire_date: "2019-06-23T07:00:00.000Z",
        needs: "",
        goals: ""
      }
    ]
  }
};
const user = {
  data: {
    user: {
      email: "testuser@gmail.com",
      is_admin: false,
      first_name: "Test",
      last_name: "User",
      current_company: "Google",
      hire_date: "2018-06-23T07:00:00.000Z",
      needs: "Talk to financial advisor about salary/equity negotiations.",
      goals: "Increase in equity."
    }
  }
};

const questions = {
  data: {
    questions: [
      {
        first_name: "Test",
        last_name: "User",
        email: "testuser@gmail.com",
        question: "My employer didnt pay me!",
        created_date: "2019-09-01T19:28:53.468Z",
        resolved: false
      },
      {
        first_name: "Admin",
        last_name: "User",
        email: "admin@gmail.com",
        question: "My employer wants to pay me too much!",
        created_date: "2019-09-01T19:28:53.468Z",
        resolved: false
      }
    ]
  }
};

const id = "17";
axios.get.mockImplementation(reqUrl => {
  if (reqUrl.includes(id)) {
    return user;
  }
  if (reqUrl.includes("users")) {
    return users;
  }
  if (reqUrl.includes("questions")) {
    return questions;
  }
});

describe("AdminPanel", function() {
  let wrapper;
  let users = [{
    user_id: id,
    email: "testadmin@test.com",
    is_admin: true,
    first_name: "admin",
    last_name: "test",
    current_company: "testcompany",
    hire_date: "2018-06-23",
    needs: "To test user data",
    goals: "Test pass"
  }]
  let questions = [{
    id: 1,
    user_id: id,
    question: "My employer didn't pay me",
    resolved: false,
    email: "user@test.com",
    first_name: "user",
    last_name: "test",
    created_date: "2019-08-29"
  }]
  let appointments = [{
    id: 1,
    user_id: id,
    first_name: "user",
    last_name: "test",
    email: "user@test.com",
    created_at: "2019-11-11",
    event_type: "One-on-One",
    event_name: "30 Minute Meeting",
    start_time_pretty: "2019-11-13",
    location: "Zoom",
    canceled: false
  }]

  beforeEach(async () => {
    wrapper = mount(<AdminPanel />);
    await wrapper.instance().componentDidMount()
    wrapper.setState({ users, questions, appointments })
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
    expect(wrapper.state("sidebarDocked")).toEqual(false);
    expect(wrapper.state("sideBarOpen")).toEqual(false);
  });

  it("has div with admin-main class", function() {
    expect(wrapper.find("div.admin-main")).toHaveLength(1);
  });

  it("has div with admin-panel class", function() {
    expect(wrapper.find("div.admin-main")).toHaveLength(1);
  });

  it('changes view state on click', function () {
    wrapper.find(".admin-main #users").simulate("click");
    expect(wrapper.state('view')).toEqual('users');

    wrapper.find(".admin-main #questions").simulate("click");
    expect(wrapper.state('view')).toEqual('questions');

    // NOTE: no table for invoices until charges branch gets merged 
    // wrapper.find('div[id="invoices"]').simulate('click');
    // expect(wrapper.state('view')).toEqual('invoices');

    wrapper.find(".admin-main #invoices").simulate("click");
    expect(wrapper.state('view')).toEqual('invoices');
  });

  it('renders the users table when view state is users', function () {
    wrapper.find("#users").simulate('click');
    wrapper.update();

    expect(wrapper.find('table[id="users-table"]')).toHaveLength(1);
  });

  it("show expected user data in the table", function() {
    wrapper.setState({ users });
    wrapper.find("#users").simulate('click')
    wrapper.update();

    const rows = wrapper.find('table[id="users-table"]');
    expect(rows.length).toEqual(1);

    const dataRow = rows
      .first()
      .find("td")
      .map(column => column.text());
    expect(dataRow.length).toEqual(9);
    expect(dataRow[0]).toEqual(id);
    expect(dataRow[1]).toEqual("testadmin@test.com");
    expect(dataRow[2]).toEqual("");
    expect(dataRow[3]).toEqual("admin");
    expect(dataRow[4]).toEqual("test");
    expect(dataRow[5]).toEqual("testcompany");
    expect(dataRow[6]).toEqual("2018-06-23");
    expect(dataRow[7]).toEqual("To test user data");
    expect(dataRow[8]).toEqual("Test pass");
  });

  it("renders the questions table when view state is questions", function() {
    wrapper.find('div[id="questions"]').simulate("click");
    wrapper.update();

    expect(wrapper.find('table[id="questions-table"]')).toHaveLength(1);
  });

  it("show expected question data in the table", function() {
    wrapper.setState({ questions });
    wrapper.find('div[id="questions"]').simulate("click");
    wrapper.update();

    const rows = wrapper.find('table[id="questions-table"]');
    expect(rows.length).toEqual(1);

    const dataRow = rows.first().find('td').map(column => column.text());
    expect(dataRow.length).toEqual(8);
    expect(dataRow[2]).toEqual("My employer didn't pay me");
    expect(dataRow[3]).toEqual("");
    
    expect(dataRow[4]).toEqual("user@test.com");
    expect(dataRow[5]).toEqual("user");
    expect(dataRow[6]).toEqual("test");
    expect(dataRow[7]).toEqual("2019-08-29");
  });
});
