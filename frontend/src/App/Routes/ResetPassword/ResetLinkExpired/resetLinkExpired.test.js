import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import ResetLinkExpired from "./resetLinkExpired";

it("renders without crashing", function() {
  shallow(<ResetLinkExpired />);
});
