import React from "react";
import { Link } from "react-router-dom";
import "./adminNavbar.css";

import PanelToggleBtn from "../PanelToggleBtn/panelToggleBtn";

class AdminNavbar extends React.Component {
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
        <p>
          <Link id="invoices" to="/admin/invoices">
            Invoices
          </Link>
        </p>
        <p>
          <Link id="calendar" to="/admin/calendar">
            Calendar
          </Link>
        </p>
      </div>
    ) : (
      <div onClick={this.toggle} className="adminNavbar"></div>
    );

    return view;
  }
}

export default AdminNavbar;
