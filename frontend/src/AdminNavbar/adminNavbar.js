import React from "react";
import "./adminNavbar.css";

import PanelToggleBtn from "../PanelToggleBtn/panelToggleBtn";

class AdminNavbar extends React.Component {
  handleClick = evt => {
    evt.preventDefault();
    this.props.changeView(evt.target.id);
  }

  toggle = evt => {
    evt.preventDefault();
    this.props.toggleSidebar();
  }

  render(){
    let view = this.props.position 
      ? (<div className="adminNavbar">
           <p id="users" onClick={ this.handleClick }>Users</p>
           <p id="questions" onClick={ this.handleClick }>Questions</p>
           <p id="invoices" onClick={ this.handleClick }>Invoices</p>
           <p id="calendar" onClick={ this.handleClick }>Calendar</p>
         </div>) 
      : (<div onClick={ this.toggle } className="adminNavbar">
           <PanelToggleBtn 
             toggleSidebar={this.props.toggleSidebar}
             direction={'toggleLeft'} />
         </div>)

    return view;
  }
}



export default AdminNavbar;
