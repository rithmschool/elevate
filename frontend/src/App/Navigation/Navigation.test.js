import React from "react";
import { shallow, mount } from "enzyme";
import { Link } from "react-router-dom";
import { MemoryRouter } from "react-router";
import Home from '../Routes/Home/home'
import toJson from "enzyme-to-json";
import Navigation from "./navigation";
import App from "../../App/app";


//TODO After Components and Routes have been added, giving the NavBar full functionality: 
// 1. Finish writing Tests without user logged in (Links that haven't been added, see note below)
// 2. Write tests for when User is logged in and when Admin is logged in (NavBar yet to be determined) 

describe("Nav Bar Testing Without Logged In User", function () {

  it("renders without crashing", function () {
    shallow(<Navigation />);
  });


  it("matches snapshot", function () {
    let wrapper = shallow(<Navigation />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });


  it("renders Navbar component on mount", function () {
    let wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find("Navbar")).toHaveLength(1);
  });

//TODO Recreate this test for other buttons when those components have been made 
  it("Make sure Logo Link exists, and click it to make sure it take you Home", () => {
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.contains(<Link className="Nav_brand-name" to="/">
      Brella
  </Link>)).toBe(true)
    wrapper.find(Link).first().simulate('click');
    expect(wrapper.find(Home)).toHaveLength(1);
  });

  it("makes sure to run componentDidMount", function () {
    const mockComponentDidMount = jest.spyOn(
      Navigation.prototype,
      'componentDidMount'
    )
    mount(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    expect(mockComponentDidMount).toHaveBeenCalled()
    expect(mockComponentDidMount).toHaveBeenCalledTimes(1);
  });


  it("runs componentDidUnmount when unmounted", function () {
    const mockComponentDidUnmount = jest.spyOn(
      Navigation.prototype,
      'componentWillUnmount'
    )
    const wrapper = mount(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    wrapper.unmount()
    expect(mockComponentDidUnmount).toHaveBeenCalled()
    expect(mockComponentDidUnmount).toHaveBeenCalledTimes(1);
  });


  it("expect three links on unlogged in Nav Bar", function () {

    let wrapper = mount(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    expect(wrapper.find(Link).length).toBe(3);
  });

});