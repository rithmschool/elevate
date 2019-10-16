import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import DashboardRoutes from "./dashboardRoutes";
import Routes from "./routes";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function() {
  shallow(<DashboardRoutes />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<DashboardRoutes />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("mounts without crashing", function() {
  mount(
    <MemoryRouter>
      <DashboardRoutes />
    </MemoryRouter>
  );
});

describe("routes using memory router", () => {
  it("should show Dashboard component for /dashboard router (using memory router)", () => {
    const component = mount(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes />
      </MemoryRouter>
    );
    console.log("this is it ********", DashboardRoutes);
    expect(component.find(DashboardRoutes)).toHaveLength(1);
  });
});
