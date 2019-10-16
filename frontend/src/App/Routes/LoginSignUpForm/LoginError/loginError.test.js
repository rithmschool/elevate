import React from "react";
import { shallow } from "enzyme";
import LoginError from "./loginError";

it("renders without crashing", function() {
  shallow(<LoginError />);
});
