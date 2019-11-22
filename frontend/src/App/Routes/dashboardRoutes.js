import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../userContext";

/** if user isnt connected can't access to Dashboard routes */
class DashboardRoutes extends React.Component {
  static contextType = UserContext;
  render() {
    if (!localStorage.token) {
      return <Redirect to="/login" />;
    }

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
