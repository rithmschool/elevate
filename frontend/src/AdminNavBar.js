import React, { Component } from "react";

class AdminNavBar extends Component {
  handleClick = (evt) => {
    evt.preventDefault();
    this.props.changeView(evt.target.id);
  }

  render() {
    return (
      <div className="adminNavBar" style={{ cursor: "pointer" }}>
        < div id="users" onClick={this.handleClick} > Users</div >
        <div id="questions" onClick={this.handleClick}>Questions</div>
        <div id="invoices" onClick={this.handleClick}>Invoices</div>
        <div id="calendar" onClick={this.handleClick}>Calendar</div>
      </div >
    )
  }
}



export default AdminNavBar;