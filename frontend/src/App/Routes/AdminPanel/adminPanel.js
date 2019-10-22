import React from "react";
import "./adminPanel.css";

import AdminNavbar from "./AdminNavbar/adminNavbar";
import AdminUserView from "./AdminUserView/adminUserView";
import AdminTable from "./AdminTable/adminTable";
import ElevateApi from "../../../elevateApi";
import Spinner from "../../Spinner/spinner";
import PanelToggleBtn from "./PanelToggleBtn/panelToggleBtn";

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sideBarOpen: true,
      users: null,
      questions: null
    };
  }

  componentDidMount = async () => {
    let users;
    let questions;

    try {
      users = await ElevateApi.getUsers();
      questions = await ElevateApi.getQuestions();
    } catch (err) {
      console.log(err);
      return err;
    }

    this.setState({ users, questions });
  };

  // get update users after delete a user in AdminUserView
  updateUserState = users => {
    this.setState({ users });
  };

  toggleSidebar = () => {
    this.setState(st => ({ sideBarOpen: !st.sideBarOpen }));
  };

  render() {
    const usersTable = <AdminTable tableObjs={this.state.users} />;

    const questionsTable = <AdminTable tableObjs={this.state.questions} />;

    const userView = (
      <AdminUserView
        updateUserState={this.updateUserState}
        changeView={this.changeView}
      />
    );

    if (!this.state.users || !this.state.questions) {
      return <Spinner />;
    }

    const position = this.state.sideBarOpen ? "showing" : "docked";
    return (
      <div className={`adminPanel_main adminPanel_main_${position}`}>
        <div className="adminPanel_panel">
          <h1 className="adminPanel_h1">Admin Panel</h1>

          {this.props.history.location.pathname === "/admin/users" &&
            usersTable}

          {this.props.history.location.pathname === "/admin/questions" &&
            questionsTable}

          {this.props.match.params.hasOwnProperty("userId") && userView}
        </div>

        <div className={`adminPanel_navbar adminPanel_navbar_${position}`}>
          <div>
            <PanelToggleBtn
              toggleSidebar={this.toggleSidebar}
              direction={this.state.sideBarOpen ? "toggleRight" : "toggleLeft"}
            />
          </div>

          <AdminNavbar
            position={this.state.sideBarOpen}
            toggleSidebar={this.toggleSidebar}
            changeView={this.changeView}
          />
        </div>
      </div>
    );
  }
}

export default AdminPanel;
