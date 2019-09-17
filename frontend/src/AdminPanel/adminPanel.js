import React from "react";
import "./adminPanel.css";

import AdminNavbar from "../AdminNavbar/adminNavbar";
import AdminUserView from "../AdminUserView/adminUserView";
import AdminTable from "../AdminTable/adminTable";
import ElevateApi from "../elevateApi";
import Spinner from "../Spinner/spinner";


const mql = window.matchMedia(`(max-width: 640px)`);

class AdminPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      view: "",
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
  updateUserState = users => {
    this.setState({ users })
  }

  changeView = view => {
    this.setState({ view })
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches });
  }

  toggleSidebar = () => {
    this.setState(st => ({ sideBarOpen: !st.sideBarOpen }));
  }

  getUserDetail = async userId => {
    const user = await ElevateApi.getUser(userId);
    
    this.setState({ view: "userDetail", userDetail: user });
  }

  render(){
    if (!this.state.users || !this.state.questions){
      return <Spinner />;
    }

    return (
      <div className="adminPanel_main">

        <div className="adminPanel_panel">

          { mql.matches 
              && <button onClick={this.toggleSidebar}>SIDEBAR</button> }

          <h1 className="adminPanel_h1">Admin Panel</h1>

          { this.state.sideBarOpen 
              && <AdminNavbar changeView={this.changeView} /> }

          { ["users", "questions"].includes(this.state.view)
              && <AdminTable 
                   tableObjs={ this.state[this.state.view] } 
                   getUserDetail={ this.getUserDetail }
                   view={ this.state.view } /> }

          { this.state.view === "userDetail" 
              && <AdminUserView 
                   user={ this.state.userDetail }
                   updateUserState={ this.updateUserState }
                   changeView={ this.changeView } /> }
        </div>
        
        <div className="adminPanel_navbar">
          <AdminNavbar changeView={ this.changeView } />
        </div>

      </div>
    )
  }
}

export default AdminPanel;
