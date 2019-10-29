import React from "react";
import { Switch } from "react-router-dom";
import DashboardRoutes from "../dashboardRoutes";
import DashboardManage from "./dashboardManage";
import DashboardAppointments from "./dashboardAppointments";
import DashboardTemplates from "./dashboardTemplates";
import AdminPrivateRoute from "../adminPrivateRoute";
import AdminPanel from "../AdminPanel/adminPanel";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>

        <Switch>
          <DashboardRoutes
            exact
            path="/dashboard/manage"
            render={props => <DashboardManage {...props} />}
          />

          <DashboardRoutes
            exact
            path="/dashboard/appointments"
            render={props => <DashboardAppointments {...props} />}
          />

          <DashboardRoutes
            exact
            path="/dashboard/templates"
            render={props => <DashboardTemplates {...props} />}
          />

          <AdminPrivateRoute
            exact={false}
            path="/dashboard/admin"
            render={props => <AdminPanel {...props} />}
          />

          <AdminPrivateRoute
            exact={true}
            path="/dashboard/admin/users/:userId"
            render={props => <AdminPanel {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Dashboard;
