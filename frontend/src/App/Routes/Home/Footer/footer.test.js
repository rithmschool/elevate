import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Footer from "./footer";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function() {
  shallow(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  let wrapper = mount(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  let serialized = toJson(wrapper.find(Footer));
  expect(serialized).toMatchSnapshot();
});
