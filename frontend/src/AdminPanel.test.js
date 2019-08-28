import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import AdminPanel from './AdminPanel';

describe('AdminPanel', function() {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AdminPanel />);
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

    wrapper.find('div[id="invoices"]').simulate('click');
    expect(wrapper.state('view')).toEqual('invoices');

    wrapper.find('div[id="templates"]').simulate('click');
    expect(wrapper.state('view')).toEqual('templates');

    wrapper.find('div[id="calendar"]').simulate('click');
    expect(wrapper.state('view')).toEqual('calendar');
  });

  it('renders the users table when view state is users', function () {
    wrapper.setState({users: []})
    wrapper.find('div[id="users"]').simulate('click');
    wrapper.update();
    
    expect(wrapper.find('table[id="users-table"]')).toHaveLength(1);
  });

  it('show expect user data in the table', function () {
    wrapper.setState({
      users: [{
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
    })
    wrapper.find('div[id="users"]').simulate('click')
    wrapper.update();

    const rows = wrapper.find('table[id="users-table"]')
    expect(rows.length).toEqual(1);

    const dataRow = rows.first().find('td').map(column => column.text())
    expect(dataRow.length).toEqual(6)
    expect(dataRow[0]).toEqual("17")
    expect(dataRow[1]).toEqual("admin test")
    expect(dataRow[2]).toEqual("testcompany")
    expect(dataRow[3]).toEqual("2018-06-23")
    expect(dataRow[4]).toEqual("To test user data")
    expect(dataRow[5]).toEqual("Test pass")
  });
});