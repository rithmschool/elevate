import React, { Component } from "react";

class AdminUserView extends Component {
  render(){
    const { first_name, last_name, email, current_company, hire_date, needs, goals } = this.props.user;

    return (
      <div id='AdminUserView'>
        <h5>{ first_name } { last_name }</h5>
        <p>Email: { email }</p>
        <p>Current Company: { current_company }</p>
        <p>Hire Date: { hire_date }</p>
        <p>Needs: { needs }</p>
        <p>Goals: { goals }</p>
        <div>Questions: </div>
      </div>
    )
  }
}

// Split questions into pending and resolved?

export default AdminUserView;