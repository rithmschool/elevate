import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Routes from "./routes";
import { MemoryRouter } from "react-router-dom";

import Home from "../Home/home";
import LoginSignupForm from "../LoginSignUpForm/loginSignUpForm";
import AdminPrivateRoute from "./adminPrivateRoute";
import AdminPanel from "../AdminPanel/adminPanel";
import AskAnExpert from "../AskAnExpert/askAnExpert";

const routeMatch = { params: {} };

it("renders without crashing", function() {
  shallow(<Routes match={routeMatch} />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<Routes match={routeMatch} />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("invalid path should redirect to 404", function() {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/invalidendpoint"]}>
      <Routes match={routeMatch} />
    </MemoryRouter>
  );
  console.log(wrapper.find(Home));
  expect(wrapper.find(Home)).toHaveLength(0);
});

it("should show Home component for / router (using memory router)", function() {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/"]}>
      <Routes match={routeMatch} />
    </MemoryRouter>
  );
  expect(wrapper.find(Home)).toHaveLength(1);
});

it("should show LoginSignupForm component for /login router (using memory router)", function() {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes match={routeMatch} />
    </MemoryRouter>
  );
  expect(wrapper.find(LoginSignupForm)).toHaveLength(1);
});

it("should show AdminPrivateRoute component for /admin router (using memory router)", function() {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/admin"]}>
      <AdminPrivateRoute render={props => <div {...props} />} />
    </MemoryRouter>
  );
  expect(wrapper.find(AdminPanel)).toHaveLength(1);
});
