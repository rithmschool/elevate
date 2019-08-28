import React from 'react';
import { shallow } from 'enzyme';
import CheckoutForm from './CheckoutForm';

// Must be wrapped in Elements to be used. When CheckoutForm is not being mounted
// On something that is used inside of App, Stripe API will cause it to crash.
// Test tests once CheckoutForm is implemented

// it("matches snapshot", function () {
//   let wrapper = shallow(<CheckoutForm />);
//   let serialized = toJson(wrapper);
//   expect(serialized).toMatchSnapshot();
// });


// it('renders without crashing', function () {
//   shallow(<CheckoutForm />);
// });

// it('If a bad token is submitted, we dont make an api call', () => {

//   const wrapper = mount(<CheckoutForm />);
//   const form = wrapper.find('form');
//   form.simulate('submit');
//   expect(response).toBe(undefined)
// });

// it('if a good token is submitted, we make an api call', () => {
//   const wrapper = mount(<CheckoutForm />);
//   const form = wrapper.find('form');
//   form.simulate('submit');
//   expect(response)
// });
