import React, { Component } from "react";

class Calendly extends Component {
  componentDidMount() {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    head.appendChild(script);
  }

  componentWillUnmount() {
    // whatever you need to cleanup the widgets code
  }

  //TODO: create a calendly account and add the data-url below
  render() {
    return (
      <div>
        <div id="schedule_form">
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/testuser"
          />
        </div>
      </div>
    );
  }
}

export default Calendly;
