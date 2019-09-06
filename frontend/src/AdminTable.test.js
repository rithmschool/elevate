import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import AdminTable from "./adminTable";

describe("AdminTable", function() {
  let wrapper;
  let users = [
    {
      id: 17,
      email: "testadmin@test.com",
      is_admin: true,
      first_name: "admin",
      last_name: "test",
      current_company: "testcompany",
      hire_date: "2018-06-23",
      needs: "To test user data",
      goals: "Test pass"
    }
  ];

  beforeEach(() => {
    wrapper = mount(<AdminTable tableObjs={users} />);
  });

  it("renders without crashing", function() {
    // Mounted in beforeEach above
  });

  it("matches snapshot", function() {
    const serialized = toJson(wrapper);

    expect(serialized).toMatchSnapshot();
  });

  it("has props", function() {
    expect(wrapper.props("tableObjs")).toEqual({
      tableObjs: [
        {
          current_company: "testcompany",
          email: "testadmin@test.com",
          first_name: "admin",
          goals: "Test pass",
          hire_date: "2018-06-23",
          id: 17,
          is_admin: true,
          last_name: "test",
          needs: "To test user data"
        }
      ]
    });
  });

  it("creates a table", function() {
    expect(wrapper.find("table")).toHaveLength(1);
  });
});
