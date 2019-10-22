import React from "react";
import { Link } from "react-router-dom";
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
        <p>
          <Link id="users" to="/admin/users">
            Users
          </Link>
        </p>
        <p>
          <Link id="questions" to="/admin/questions">
            Questions
          </Link>
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
