import React from "react";
import { Route, Redirect } from "react-router-dom";

/** if user is connected can't access to reseting password routes */
class ForgotPassRoutes extends React.Component {
  render() {
    const token = localStorage.getItem("token");

    if (token) return <Redirect to="/" />;

    return (
      <Route
        exact={this.props.exact}
        path={this.props.path}
        render={this.props.render}
      />
    );
  }
}

export default ForgotPassRoutes;
