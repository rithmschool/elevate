import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import AdminNavBar from './AdminNavBar';

describe('AdminNavBar', function() {
  it('renders without crashing', function () {
    shallow(<AdminNavBar />);
  });
  
  it("matches snapshot", function () {
    let wrapper = shallow(<AdminNavBar />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });
});