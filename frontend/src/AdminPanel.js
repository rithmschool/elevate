import React, { Component } from 'react';
import './AdminPanel.css'
import AdminNavBar from './AdminNavBar';
import AdminUserView from './AdminUserView';
import AdminTable from './AdminTable';
import ElevateApi from './ElevateApi';

const mql = window.matchMedia(`(max-width: 640px)`);

class AdminPanel extends Component {
  constructor(props){
    super(props);

    this.state = {
      view: '',
      sidebarDocked: mql.matches,
      sideBarOpen: false,
      users: null,
      questions: null,
      userDetail: null,
      appointments: null
    }
  }

  componentDidMount = async () => {
    mql.addListener(this.mediaQueryChanged);
    let users;
    let questions;
    let appointments;

    try {
      users = await ElevateApi.getUsers();
      questions = await ElevateApi.getQuestions();
      appointments = await ElevateApi.getAppointments();
    

    } catch(err) {
      return err;
    }
    
    this.setState({ users });
    this.setState({ questions });
    this.setState({ appointments });
  }

  changeView = view => {
    this.setState({ view });
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches });
  }

  toggleSidebar = () => {
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  }

  getUserDetail = async evt => {
    const userId = +evt.target.parentNode.firstElementChild.innerText;
    const user = await ElevateApi.getUser(userId);
    
    this.setState({ view: 'userDetail', userDetail: user });
  }

  render(){
    if (!this.state.users || !this.state.questions || !this.state.appointments){
      return (<div>...Loading</div>);
    }

// TODO: refactoring logic of this.state.view to render AdminTable for correct view
    return(
      <div className="admin-main">
        <div className="admin-panel">
          { mql.matches && <button onClick={this.toggleSidebar}>SIDEBAR</button> }
          <h1 className="admin-h1">Admin Panel</h1>
          { this.state.sideBarOpen && <AdminNavBar changeView={this.changeView} /> }
        
          { this.state.view ? 
            <AdminTable tableObjs={ this.state[this.state.view] } 
                        getUserDetail={ this.getUserDetail }
                        view={ this.state.view } /> : null
          }
          {this.state.view === 'userDetail' ? <AdminUserView user={this.state.userDetail}/> : null }
        </div>
        
        <div className="admin-navbar">
          <AdminNavBar changeView={this.changeView}/>
        </div>
      </div>
    )
  }
}

export default AdminPanel;
