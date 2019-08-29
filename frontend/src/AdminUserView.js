import React, { Component } from "react";
import './AdminUserView.css';
import ElevateApi from './ElevateApi';

class AdminUserView extends Component {
  handleClickX = async () => {
      await ElevateApi.deleteUser(this.props.user.id)
      let users;

    try {
      users = await ElevateApi.getUsers();
    } catch(err) {
      return err;
    }
      this.props.updateState(users)
      this.props.updateViewState("users")
  }
  render(){
    const { first_name, last_name, email, current_company, hire_date, needs, goals } = this.props.user;

    return (
      <div className='AdminUserView'>
        <div>
          <h4>{ first_name } { last_name }</h4>
          <table>
            <tbody>
              <tr>
                <td><b>Email:</b></td>
                <td>{ email }</td> 
              </tr>
              <tr>
                <td><b>Company:</b></td>
                <td>{ current_company }</td> 
              </tr>
              <tr>
                <td><b>Hire Date:</b></td>
                <td>{ hire_date.slice(0, 10) }</td> 
              </tr>
              <tr>
                <td><b>Needs:</b></td>
                <td>{ needs }</td> 
              </tr>
              <tr>
                <td><b>Goals:</b></td>
                <td>{ goals }</td> 
              </tr>
              <tr>
                <td><b>Questions:</b></td>
                {/* Add user questions here */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default AdminUserView;