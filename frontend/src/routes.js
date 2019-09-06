import React from 'react';
import {  Route, Switch, Redirect } from "react-router-dom";
import ForgotPassword from './forgotPassword';
import ResetPassword from './resetPassword';
import ForgotPassRoutes from './forgotPassRoutes'
import Home from './home';
import UserProfile from './userProfile';
import LogInSignUpForm from'./logInSignUpForm';
import AdminPanel from './adminPanel';
import AdminPrivateRoute from "./adminPrivateRoute";
import UserPrivateRoute from './userPrivateRoute';


class Routes extends React.Component {

	render(){
		return(
			<Switch>
				<Route exact path="/" render={props =>
					(<Home {...props} />)}/>

				<Route exact path="/login" render={props => 
					(<LogInSignUpForm {...props} getCurrentUser={this.props.getCurrentUser}/>)}/>

				<AdminPrivateRoute exact path="/admin" render={props =>
					 (<AdminPanel {...props} />)}/>

				<UserPrivateRoute
					path="/users/:userId"
					render={props =>
						(<UserProfile {...props} />)}/>

				<ForgotPassRoutes exact path="/reset-password/forgot" render={() =>
					(<ForgotPassword />)} />

				<ForgotPassRoutes exact path="/reset-password/:token" render={props =>
									(<ResetPassword {...props}/>)} />

				<Redirect to="/" />
			</Switch>
		)
	}
}

export default  Routes;