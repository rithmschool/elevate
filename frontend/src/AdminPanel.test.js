import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import AdminPanel from './AdminPanel';

it('renders without crashing', function () {
  shallow(<AdminPanel />);
});

it("matches snapshot", function () {
  let wrapper = shallow(<AdminPanel />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});