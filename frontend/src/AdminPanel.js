import React, { Component } from 'react';
import './AdminPanel.css'
import AdminNavBar from './AdminNavBar';
import {users, charges, salaries} from './adminPanelTestData'
import { Table } from 'react-bootstrap';

const mql = window.matchMedia(`(max-width: 640px)`);

class AdminPanel extends Component {
  constructor(props){
    super(props);

    this.state = {
      view: '',
      sidebarDocked: mql.matches,
      sideBarOpen: false
    }
  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  changeView = (view) => {
    this.setState({ view })
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches });
  }

  toggleSidebar = () => {
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  }

  viewComponent = () => {
    if(this.state.view === "users"){
    
      return (
        <Table striped bordered hover size="sm" responsive id="users-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Company</th>
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
          { mql.matches && <button onClick={this.toggleSidebar}>SIDEBAR</button> }
          <h1>Admin Panel</h1>
          { this.state.sideBarOpen && <AdminNavBar changeView={this.changeView} /> }
          <div>{this.viewComponent()}</div>
        </div>
        <div className="admin-navbar"><AdminNavBar changeView={this.changeView}/></div>
      </div>
    )
  }
}

export default AdminPanel;