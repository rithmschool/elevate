import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
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
    wrapper = mount(
      <MemoryRouter>
        <AdminTable tableObjs={users} />
        );
      </MemoryRouter>
    );
  });

  it("renders without crashing", function() {
    // Mounted in beforeEach above
  });

  it("has props", function() {
    expect(wrapper.find(AdminTable).props("tableObjs")).toEqual({
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

  it("shows expected user data in the table", function() {
    const rows = wrapper.find(".table").last();

    expect(rows.length).toEqual(1);

    const dataRow = rows
      .first()
      .find("td")
      .map(column => column.text());

    expect(dataRow.length).toEqual(9);

    expect(dataRow[0]).toEqual("17");
    expect(dataRow[1]).toEqual("testadmin@test.com");
    expect(dataRow[2]).toEqual("");
    expect(dataRow[3]).toEqual("admin");
    expect(dataRow[4]).toEqual("test");
    expect(dataRow[5]).toEqual("testcompany");
    expect(dataRow[6]).toEqual("2018-06-23");
    expect(dataRow[7]).toEqual("To test user data");
  });

  it("creates a table", function() {
    expect(wrapper.find("table")).toHaveLength(1);
  });
});
