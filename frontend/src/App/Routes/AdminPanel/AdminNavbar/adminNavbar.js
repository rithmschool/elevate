import React from "react";
import "./adminNavbar.css";

import PanelToggleBtn from "../PanelToggleBtn/panelToggleBtn";

class AdminNavbar extends React.Component {
  handleChangeView = evt => {
    evt.preventDefault();
    this.props.changeView(evt.target.id);
  };

  toggle = () => {
    this.props.toggleSidebar();
  };

  render() {
    let view = this.props.position ? (
      <div className="adminNavbar">
        <p id="users" onClick={this.handleChangeView}>
          Users
        </p>
        <p id="questions" onClick={this.handleChangeView}>
          Questions
        </p>
        <p id="invoices" onClick={this.handleChangeView}>
          Invoices
        </p>
        <p id="calendar" onClick={this.handleChangeView}>
          Calendar
        </p>
      </div>
    ) : (
      <div onClick={this.toggle} className="adminNavbar"></div>
    );

    return view;
  }
}

export default AdminNavbar;
