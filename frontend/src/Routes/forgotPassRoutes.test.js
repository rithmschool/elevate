import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import ForgotPassRoutes from "./forgotPassRoutes";

it("renders without crashing", function() {
  shallow(<ForgotPassRoutes />);
});
