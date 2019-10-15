import React from "react";
import { shallow, mount } from "enzyme";
import { Link } from "react-router-dom";
import { MemoryRouter } from 'react-router'

import toJson from "enzyme-to-json";
import Navigation from "./navigation";
import App from "../../App/app";

it("renders without crashing", function () {
  shallow(<Navigation />);
});

it("matches snapshot", function () {
  let wrapper = shallow(<Navigation />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

//Will Not Pass These Tests Till Context issues fixed.
it('renders Navbar component on mount', function () {
  let wrapper = mount(
    <MemoryRouter>
      <App />
    </MemoryRouter>);

  expect(wrapper.find("Navbar")).toHaveLength(1);
});

//Will Not Pass Till Context issues fixed.
it("runs componentDidMount with updated state", async function () {
  const wrapper = mount(
    <MemoryRouter>
      <App />
    </MemoryRouter>);
  expect(wrapper.state().loading).toEqual(true);

  await wrapper.instance().componentDidMount();

  wrapper.update()
  expect(wrapper.state().loading).toEqual(false);
});

//Will Not Pass Till Context issues fixed.
xit('Test click event', () => {
  const wrapper = shallow(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>);
  console.log('wrapper', wrapper)
  wrapper.find('.Login').simulate('click');
  expect(wrapper.find('.clicks-1').length).to.equal(1);
});
