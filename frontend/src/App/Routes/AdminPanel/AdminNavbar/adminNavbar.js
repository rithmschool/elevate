import React from "react";
import { Link } from "react-router-dom";
import "./adminNavbar.css";

class AdminNavbar extends React.Component {
  toggle = () => {
    this.props.toggleSidebar();
  };

  render() {
    let view = this.props.position ? (
      <div className="adminNavbar">
        <p>
          <Link
            id="documents"
            className="admin-link"
            to="/dashboard/admin/documents"
          >
            Documents
          </Link>
        </p>
        <p>
          <Link id="users" className="admin-link" to="/dashboard/admin/users">
            Users
          </Link>
        </p>
        <p>
          <Link
            id="questions"
            className="admin-link"
            to="/dashboard/admin/questions"
          >
            Questions
          </Link>
        </p>
        <p>
          <Link
            id="invoices"
            className="admin-link"
            to="/dashboard/admin/invoices"
          >
            Invoices
          </Link>
        </p>
        <p>
          <Link
            id="calendar"
            className="admin-link"
            to="/dashboard/admin/calendar"
          >
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
