import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import SideBar from "./sideBar";

const routes = [
  {
    path: "/overview",
    exact: true,
    content: <h2>My Comp Overview</h2>,
    name: "My Comp Overview"
  },
  {
    path: "/offers",
    exact: true,
    content: <h2>My offers</h2>,
    name: "My offers"
  },
  {
    path: "/upload-offer",
    content: () => <h2>Upload an offer</h2>,
    name: "Upload an offer"
  }
];

// mock the route "match" prop

it("renders without crashing", function() {
  shallow(<SideBar routes={routes} />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<SideBar routes={routes} />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
