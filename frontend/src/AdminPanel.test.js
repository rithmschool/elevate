import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import AdminPanel from './AdminPanel';

describe('AdminPanel', function() {
  let wrapper;
  let users = [{
    id: 17, 
    email: "testadmin@test.com", 
    is_admin: true, 
    first_name: "admin", 
    last_name: "test", 
    current_company:"testcompany", 
    hire_date: "2018-06-23", 
    needs:"To test user data", 
    goals:"Test pass"
  }]
  let questions = [{
    id: 17,
    question: "My employer didn't pay me",
    resolved: false,
    email: "user@test.com",
    first_name: "user",
    last_name: "test",
    created_date: "2019-08-29"
  }]

  beforeEach(() => {
    wrapper = mount(<AdminPanel />);
    wrapper.setState ({ users, questions })
  });

  it('renders without crashing', function () {
    shallow(<AdminPanel />);
  });
  
  it('matches snapshot', function () {
    const serialized = toJson(wrapper);

    expect(serialized).toMatchSnapshot();
  });

  it('has states', function () {
    expect(wrapper.state('view')).toEqual('');
    expect(wrapper.state('sidebarDocked')).toEqual(false);
    expect(wrapper.state('sideBarOpen')).toEqual(false);
  });

  it('has div with admin-main class', function () {
    expect(wrapper.find('div.admin-main')).toHaveLength(1);
  });

  it('has div with admin-panel class', function () {
    expect(wrapper.find('div.admin-main')).toHaveLength(1);
  });

  it('changes view state on click', function () {
    wrapper.find('div[id="users"]').simulate('click');
    expect(wrapper.state('view')).toEqual('users');

    wrapper.find('div[id="questions"]').simulate('click');
    expect(wrapper.state('view')).toEqual('questions');

    wrapper.find('div[id="invoices"]').simulate('click');
    expect(wrapper.state('view')).toEqual('invoices');

    wrapper.find('div[id="calendar"]').simulate('click');
    expect(wrapper.state('view')).toEqual('calendar');
  });

  it('renders the users table when view state is users', function () {
    wrapper.find('div[id="users"]').simulate('click');
    wrapper.update();
    
    expect(wrapper.find('table[id="users-table"]')).toHaveLength(1);
  });

  it('show expected user data in the table', function () {
    wrapper.setState({users});
    wrapper.find('div[id="users"]').simulate('click')
    wrapper.update();

    const rows = wrapper.find('table[id="users-table"]')
    expect(rows.length).toEqual(1);

    const dataRow = rows.first().find('td').map(column => column.text())
    expect(dataRow.length).toEqual(9);
    expect(dataRow[0]).toEqual("17");
    expect(dataRow[1]).toEqual("testadmin@test.com");
    expect(dataRow[2]).toEqual("");
    expect(dataRow[3]).toEqual("admin");
    expect(dataRow[4]).toEqual("test");
    expect(dataRow[5]).toEqual("testcompany");
    expect(dataRow[6]).toEqual("2018-06-23");
    expect(dataRow[7]).toEqual("To test user data");
    expect(dataRow[8]).toEqual("Test pass");
  });

  it('renders the questions table when view state is questions', function () {
    wrapper.find('div[id="questions"]').simulate('click');
    wrapper.update();
    
    expect(wrapper.find('table[id="questions-table"]')).toHaveLength(1);
  });

  it('show expected question data in the table', function () {
    wrapper.setState({questions})
    wrapper.find('div[id="questions"]').simulate('click')
    wrapper.update();

    const rows = wrapper.find('table[id="questions-table"]')
    expect(rows.length).toEqual(1);

    const dataRow = rows.first().find('td').map(column => column.text());
    expect(dataRow.length).toEqual(7);
    expect(dataRow[0]).toEqual("17");
    expect(dataRow[1]).toEqual("My employer didn't pay me");
    expect(dataRow[2]).toEqual("");
    expect(dataRow[3]).toEqual("user@test.com");
    expect(dataRow[4]).toEqual("user");
    expect(dataRow[5]).toEqual("test");
    expect(dataRow[6]).toEqual("2019-08-29");
  });
});