import React, { Component } from 'react';
import './AdminPanel.css'
import AdminNavBar from './AdminNavBar';
import {users, charges, salaries} from './adminPanelTestData'
import { Table } from 'react-bootstrap';

class AdminPanel extends Component {
constructor(props){
  super(props);
  this.state = {view: ""}
}
// componentDidMount(){
  // this.changeView("users")
// }

changeView = (view) => {
  this.setState({view})
}

viewComponent = () => {
  if(this.state.view === "users"){
  
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Company</th>
            <th>Salary</th>
            <th>Hire Date</th>
            <th>Needs</th>
            <th>Goals</th>
          </tr>
        </thead>
        <tbody>
        {users.map(user => {
          return (
            <tr key={user.id}>
              <td >{user.id}</td>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.current_company}</td>
              <td>{user.salary}</td>
              <td>{user.hire_date}</td>
              <td>{user.needs}</td>
              <td>{user.goals}</td>
            </tr>)
        })}
        </tbody>
      </Table>

    )
  }
}

render(){
  return(
    <div className="admin-main">
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        <div>{this.viewComponent()}</div>
      </div>
        
      <div className="admin-navbar"><AdminNavBar changeView={this.changeView}/></div>
      
    </div>
  )
}

}

export default AdminPanel;