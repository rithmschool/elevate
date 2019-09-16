import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ForgotPassword from "./ForgotPassword/forgotPassword";
import ResetPassword from "./ResetPassword/resetPassword";
import ForgotPassRoutes from "./forgotPassRoutes";
import Home from "./Home/home";
import UserProfile from "./userProfile";
import LogInSignUpForm from "./logInSignUpForm";
import AdminPanel from "./adminPanel";
import AdminPrivateRoute from "./adminPrivateRoute";
import UserPrivateRoute from "./userPrivateRoute";
import AskAnExpert from "./AskAnExpert";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={props => <Home {...props} />} />

        <Route
          exact
          path="/login"
          render={props => (
            <LogInSignUpForm
              {...props}
              getCurrentUser={this.props.getCurrentUser}
            />
          )}
        />

        <AdminPrivateRoute
          exact
          path="/admin"
          render={props => <AdminPanel {...props} />}
        />

        <Route exact path="/ask-an-expert" render={() => <AskAnExpert /> } />

        <UserPrivateRoute
          path="/users/:userId"
          render={props => <UserProfile {...props} />}
        />

        <ForgotPassRoutes
          exact
          path="/reset-password/forgot"
          render={() => <ForgotPassword />}
        />

        <ForgotPassRoutes
          exact
          path="/reset-password/:token"
          render={props => <ResetPassword {...props} />}
        />

        <Redirect to="/" />
      </Switch>
    );
  }
}

export default Routes;
