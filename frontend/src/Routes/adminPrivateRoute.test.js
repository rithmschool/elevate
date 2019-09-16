import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import PrivateRoute from "./adminPrivateRoute";

it("renders without crashing", function() {
  shallow(<PrivateRoute />);
});

