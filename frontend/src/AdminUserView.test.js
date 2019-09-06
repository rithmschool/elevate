import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import AdminUserView from './adminUserView';

describe('AdminUserView', function() {
  let wrapper;
  const testData = { 
    first_name: 'Han', 
    last_name: 'Solo', 
    email: 'han@solo.com', 
    current_company: 'SpaceX', 
    hire_date: '2018-09-01', 
    needs: 'Negotiate a raise during annual review', 
    goals: 'Increase salary by 15k'
  }

  beforeEach(() => {
    wrapper = mount(<AdminUserView user={testData}/>);
  });

  it('renders without crashing', function () {
    // Mounted in beforeEach above
  });
  
  it('matches snapshot', function () {
    const serialized = toJson(wrapper);

    expect(serialized).toMatchSnapshot();
  });

  it('has a user prop', function () {
    expect(wrapper.prop('user')).toEqual(testData);
  });

  it('has div with AdminUserView class', function () {
    expect(wrapper.find('div.AdminUserView')).toHaveLength(1);
  });

  it('has user info fields', function () {
    expect(wrapper.html()).toContain('Email');
    expect(wrapper.html()).toContain('Company');
    expect(wrapper.html()).toContain('Hire Date');
    expect(wrapper.html()).toContain('Needs');
    expect(wrapper.html()).toContain('Goals');
    expect(wrapper.html()).toContain('Questions');
  });
});