import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import ForgotPassword from "../ForgotPassword/forgotPassword";
import ResetPassword from "../ResetPassword/resetPassword";
import Home from "../Home/home";
import UserProfile from "../UserProfile/userProfile";
import LoginSignUpForm from "../LoginSignUpForm/loginSignUpForm";
import AdminPanel from "../AdminPanel/adminPanel";
import AskAnExpert from "../AskAnExpert/askAnExpert";

import AdminPrivateRoute from "./adminPrivateRoute";
import ForgotPassRoutes from "./forgotPassRoutes";
import UserPrivateRoute from "./userPrivateRoute";


class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={props => <Home {...props} />} />

        <Route
          exact
          path="/login"
          render={ props => <LoginSignUpForm 
            { ...props }
            getCurrentUser={ this.props.getCurrentUser } /> } />

        <AdminPrivateRoute
          exact
          path="/admin"
          render={ props => <AdminPanel { ...props } /> } />

        <Route 
          exact
          path="/ask-an-expert" 
          render={ () => <AskAnExpert /> } />

        <UserPrivateRoute
          path="/users/:userId"
          render={ props => <UserProfile { ...props } /> } />

        <ForgotPassRoutes
          exact
          path="/reset-password/forgot"
          render={ () => <ForgotPassword /> } />

        <ForgotPassRoutes
          exact
          path="/reset-password/:token"
          render={ props => <ResetPassword { ...props } /> } />

        <Redirect to="/" />
      </Switch>
    );
  }
}

export default Routes;