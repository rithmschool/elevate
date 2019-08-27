import React, { Component } from 'react';
import './AdminPanel.css'
import AdminNavBar from './AdminNavBar';
// import {users, charges, salaries} from './adminPanelTestData'
import { Table } from 'react-bootstrap';
import axios from 'axios';

const mql = window.matchMedia(`(max-width: 640px)`);

class AdminPanel extends Component {
  constructor(props){
    super(props);

    this.state = {
      view: '',
      sidebarDocked: mql.matches,
      sideBarOpen: false,
      users: null
    }
  }
  //connect to api
  //TODO: Move this to ElevateApi file after 
  getUser = async () => {
    // let _token = localStorage.getItem("token");
    const BASE_URL = process.env.BASE_URL || "http://localhost:3001";
    let res = await axios.get(`${BASE_URL}/users`,{params: {_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpc19hZG1pbiI6dHJ1ZSwiaWF0IjoxNTY2OTI0MDgzfQ.jFe4zxFaCzmToGs_dEVfLaofyiYnKDT5m2qn9rJIseA"}})
    return res.data.users
  }

  async componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
    const users = await this.getUser()
    this.setState({users})
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
          {this.state.users.map(user => {
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