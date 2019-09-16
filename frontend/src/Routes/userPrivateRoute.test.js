import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import UserPrivateRoute from "./userPrivateRoute";

it("renders without crashing", function() {
  shallow(<UserPrivateRoute />);
});

