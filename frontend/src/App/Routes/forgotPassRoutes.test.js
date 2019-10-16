import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import ForgotPassRoutes from "./forgotPassRoutes";
import Routes from "./routes";
import App from "./../app"
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function() {
  shallow(<ForgotPassRoutes />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<ForgotPassRoutes />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("mounts without crashing", function() {
  mount(
    <MemoryRouter>
      <ForgotPassRoutes />
    </MemoryRouter>
  );
});

describe("routes using memory router", () => {
  it("should show ForgotPassword component for /reset-password/forgot router (using memory router)", () => {
    const component = mount(
      <MemoryRouter initialEntries={["/reset-password/forgot"]}>
        <Routes />
      </MemoryRouter>
    );
    expect(component.find(ForgotPassRoutes)).toHaveLength(1);
  });
});
