import React from "react";
import { shallow, mount } from "enzyme";
import { Link } from "react-router-dom";
import { MemoryRouter } from "react-router";
import Home from "../Routes/Home/home";
import toJson from "enzyme-to-json";
import Navigation from "./navigation";
import App from "../../App/app";

describe("Nav Bar Testing Without Logged In User", function() {
  it("renders without crashing", function() {
    shallow(<Navigation />);
  });

  it("matches snapshot", function() {
    let wrapper = shallow(<Navigation />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });

  it("renders Navbar component on mount", function() {
    let wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find("Navbar")).toHaveLength(1);
  });

  it("Make sure Logo Link exists, and click it to make sure it take you Home", () => {
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(
      wrapper.contains(
        <Link className="Nav_brand-name" to="/">
          Brella
        </Link>
      )
    ).toBe(true);
    wrapper
      .find(Link)
      .first()
      .simulate("click");
    expect(wrapper.find(Home)).toHaveLength(1);
  });

  it("expect four links on unlogged in Nav Bar", function() {
    let wrapper = mount(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    expect(wrapper.find(Link).length).toBe(4);
  });
});
