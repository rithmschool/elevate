import React from "react";
import "./adminPanel.css";
import { Switch } from "react-router-dom";

import AdminPrivateRoute from "../adminPrivateRoute";
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
    if (!this.state.users || !this.state.questions) {
      return <Spinner />;
    }

    const position = this.state.sideBarOpen ? "showing" : "docked";
    return (
      <div className={`adminPanel_main adminPanel_main_${position}`}>
        <div className="adminPanel_panel">
          <h1 className="adminPanel_h1">Admin Panel</h1>

          <Switch>
            <AdminPrivateRoute
              exact
              path="/dashboard/admin/users"
              render={props => (
                <AdminTable tableObjs={this.state.users} {...props} />
              )}
            />
            <AdminPrivateRoute
              exact
              path="/dashboard/admin/questions"
              render={props => (
                <AdminTable tableObjs={this.state.questions} {...props} />
              )}
            />
            <AdminPrivateRoute
              exact
              path="/dashboard/admin/users/:userId"
              render={props => (
                <AdminUserView
                  updateUserState={this.updateUserState}
                  {...props}
                />
              )}
            />
          </Switch>
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
          />
        </div>
      </div>
    );
  }
}

export default AdminPanel;
