import React from 'react';
import { shallow, mount } from 'enzyme';
import Charge from './Charge';

// Charge Component will never be rendered without props
it('renders without crashing', function () {
  const testCharge = { amount: 100, description: "test charge", due_date: "2019-04-19" }
  shallow(<Charge charge={testCharge} />);
});

it("matches snapshot", function () {
  let wrapper = shallow(<Charge />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});


it('contains the proper props', function () {
  const testCharge = { amount: 100, description: "test charge", due_date: "2019-04-19" }
  const wrapper = mount(<Charge {...testCharge} />);
  console.log(wrapper.props());
  expect('amount' in wrapper.props()).toEqual(true);
});