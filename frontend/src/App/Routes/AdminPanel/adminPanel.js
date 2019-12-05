import React from "react";
import "./adminPanel.css";
import { Switch } from "react-router-dom";

import AdminPrivateRoute from "../adminPrivateRoute";
import AdminNavbar from "./AdminNavbar/adminNavbar";
import AdminUserView from "./AdminUserView/adminUserView";
import AdminDocView from "./AdminDocView/adminDocView";
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
      questions: null,
      documents: null
    };
  }

  componentDidMount = async () => {
    let users;
    let questions;
    let documents;

    try {
      users = await ElevateApi.getUsers();
      questions = await ElevateApi.getQuestions();
      documents = await ElevateApi.getDocuments();
    } catch (err) {
      console.log(err);
      return err;
    }

    this.setState({ users, questions, documents });
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
                <AdminTable
                  tableType={"users"}
                  tableObjs={this.state.users}
                  {...props}
                />
              )}
            />
            <AdminPrivateRoute
              exact
              path="/dashboard/admin/questions"
              render={props => (
                <AdminTable
                  tableType={"questions"}
                  tableObjs={this.state.questions}
                  {...props}
                />
              )}
            />
            <AdminPrivateRoute
              exact
              path="/dashboard/admin/documents"
              render={props => (
                <AdminTable
                  tableType={"documents"}
                  tableObjs={this.state.documents}
                  {...props}
                />
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
            <AdminPrivateRoute
              exact
              path="/dashboard/admin/documents/:docId"
              render={props => (
                <AdminDocView allDocs={this.state.documents} {...props} />
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
