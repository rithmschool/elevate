import React from 'react';
import {  Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import UserProfile from './UserProfile';
import LogInSignUpForm from'./LogInSignUpForm';
import AdminPanel from './AdminPanel';
import AdminPrivateRoute from "./AdminPrivateRoute";
import UserPrivateRoute from './UserPrivateRoute';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ForgotPassRoutes from './ForgotPassRoutes'


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

