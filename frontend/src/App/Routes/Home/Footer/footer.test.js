import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Footer from "./footer";
import { MemoryRouter } from "react-router-dom";

describe("Footer", function() {
  let wrapper;

  it('renders', () => {
    wrapper = shallow(<Footer />);
  });

  beforeEach(() => {
    var onSubmitFn = jest.fn();
    wrapper = mount(
      <MemoryRouter>
        <Footer onSubmit={onSubmitFn}/>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function() {
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });

  it("changes signedUp state on submit", function() {
    var onSubmitFn = jest.fn();
    wrapper = mount(
      <MemoryRouter>
        <Footer onSubmit={onSubmitFn}/>
      </MemoryRouter>
    );
    wrapper.setState({
      email: "",
      signedUp: false
    });
    console.log("wrapper state", wrapper.state())
    let form = wrapper.find("form");
    form.simulate("submit");
    // console.log("new wrapper state", wrapper.state())
    // expect(wrapper.state("signedUp")).toEqual(true);
    expect(onSubmitFn).toHaveBeenCalledTimes(1);

    wrapper.update();

    expect(wrapper.find('input[id="email"]')).toHaveLength(0);
  });
});
