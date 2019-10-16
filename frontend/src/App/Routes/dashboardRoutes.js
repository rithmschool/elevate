import React from "react";
import { Route, Redirect } from "react-router-dom";

/** if user isnt connected can't access to Dashboard routes */
class DashboardRoutes extends React.Component {
  render() {
    const token = localStorage.getItem("token");

    if (!token) return <Redirect to="/login" />;

    return (
      <Route
        exact={this.props.exact}
        path={this.props.path}
        render={this.props.render}
      />
    );
  }
}

export default DashboardRoutes;
