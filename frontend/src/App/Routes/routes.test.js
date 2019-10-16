import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Routes from "./routes";

it("renders without crashing", function() {
  shallow(<Routes />);
});
