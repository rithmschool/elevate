import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Routes from "./routes";
import { MemoryRouter } from "react-router-dom";

import Home from "./Home/home";
import LoginSignupForm from "./LoginSignUpForm/loginSignUpForm";
import AskAnExpert from "./AskAnExpert/askAnExpert";
import App from "../app";

it("renders without crashing", function() {
  shallow(<Routes />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<Routes />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("invalid path should redirect to /", function() {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/invalidendpoint"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(Home)).toHaveLength(1);
});

it("should show Home component for / route (using memory router)", function() {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/"]}>
      <Routes />
    </MemoryRouter>
  );
  expect(wrapper.find(Home)).toHaveLength(1);
});

it("should show LoginSignupForm component for /login route (using memory router)", function() {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes />
    </MemoryRouter>
  );
  expect(wrapper.find(LoginSignupForm)).toHaveLength(1);
});

it("should show AskAnExpert component for /ask-an-expert route (using memory router)", function() {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/ask-an-expert"]}>
      <Routes />
    </MemoryRouter>
  );
  expect(wrapper.find(AskAnExpert)).toHaveLength(1);
});


