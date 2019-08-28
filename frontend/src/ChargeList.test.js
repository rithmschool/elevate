import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import ChargeList from './ChargeList';

it('renders without crashing', function () {
  shallow(<ChargeList />);
});

it("matches snapshot", function () {
  let wrapper = shallow(<ChargeList />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
