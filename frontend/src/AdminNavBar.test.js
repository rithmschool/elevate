import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import AdminNavBar from './AdminNavBar';

describe('AdminNavBar', function() {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AdminNavBar />);
  });
  
  it('renders without crashing', function () {
    shallow(<AdminNavBar />);
  });
  
  it('matches snapshot', function () {
    let serialized = toJson(wrapper);

    expect(serialized).toMatchSnapshot();
  });

  it('has div with admin-navbar class', function () {
    expect(wrapper.find('div.adminNavBar')).toHaveLength(1);
  });

  it('has a div for users, invoices, templates, and calendars', function () {
    expect(wrapper.find('div[id="users"]')).toHaveLength(1);
    expect(wrapper.find('div[id="invoices"]')).toHaveLength(1);
    expect(wrapper.find('div[id="templates"]')).toHaveLength(1);
    expect(wrapper.find('div[id="calendar"]')).toHaveLength(1);
  });

  it('calls handleClick', function () {
    const spy = jest.spyOn(wrapper.instance(), "handleClick");
    wrapper.setProps({ changeView: function changeView(){} });
    wrapper.find('div[id="users"]').simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});