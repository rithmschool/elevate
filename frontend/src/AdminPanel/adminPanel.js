import React, { Component } from 'react';
import './adminPanel.css'
import AdminNavbar from '../AdminNavbar/adminNavbar';
import AdminUserView from '../AdminUserView/adminUserView';
import AdminTable from '../adminTable';
import ElevateApi from '../elevateApi';

const mql = window.matchMedia(`(max-width: 640px)`);

class AdminPanel extends Component {
  constructor(props){
    super(props);

    this.state = {
      view: '',
      sidebarDocked: mql.matches,
      sideBarOpen: false,
      users: null,
      questions:null,
      userDetail: null
    }
  }

  componentDidMount = async () => {
    mql.addListener(this.mediaQueryChanged);
    let users;
    let questions;

    try {
      users = await ElevateApi.getUsers();
      questions = await ElevateApi.getQuestions();
    } catch(err) {
      console.log(err)
      return err;
    }
    
    this.setState({ users, questions });
  }

  // get update users after delete a user in AdminUserView
  updateUserState = (users) => {
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

  getUserDetail = async (userId) => {
    const user = await ElevateApi.getUser(userId);
    
    this.setState({ view: 'userDetail', userDetail: user });
  }

  render(){
    if (!this.state.users || !this.state.questions){
      return (<div>...Loading</div>);
    }

    return(
      <div className="admin-main">
        <div className="admin-panel">
          { mql.matches && <button onClick={this.toggleSidebar}>SIDEBAR</button> }
          <h1 className="admin-h1">Admin Panel</h1>
          { this.state.sideBarOpen && <AdminNavbar changeView={this.changeView} /> }
          { this.state.view === 'users' || this.state.view === 'questions' ? 
            <AdminTable tableObjs={ this.state[this.state.view] } 
                        getUserDetail={ this.getUserDetail }
                        view={ this.state.view } /> : null
          }
          {this.state.view === 'userDetail' && 
                                <AdminUserView 
                                  user={this.state.userDetail} 
                                  updateUserState={this.updateUserState} 
                                  changeView={this.changeView} /> 
          }
        </div>
        
        <div className="admin-navbar">
          <AdminNavbar changeView={this.changeView}/>
        </div>
      </div>
    )
  }
}

export default AdminPanel;
