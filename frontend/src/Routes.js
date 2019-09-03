import React from 'react';
import {  Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import UserProfile from './UserProfile';
import LogInSignUpForm from'./LogInSignUpForm';
import AdminPanel from './AdminPanel';
import AdminPrivateRoute from "./AdminPrivateRoute";
import UserPrivateRoute from './UserPrivateRoute';
import ForgotPassword from './ForgotPassword';


class Routes extends React.Component {

	render(){
		return(
			<Switch>
				<Route exact path="/" render={props =>
					(<Home {...props} />)}/>

				<Route exact path="/login" render={props => 
					(<LogInSignUpForm {...props} getCurrentUser={this.props.getCurrentUser}/>)}/>

				<AdminPrivateRoute exact path="/admin" render={() =>
					 (<AdminPanel />)}/>

				<UserPrivateRoute
					path="/users/:userId"
					render={props =>
						(<UserProfile {...props} />)}/>

				<Route exact path="/forgotpassword" render={() =>
					(<ForgotPassword />)} />

				<Redirect to="/" />
			</Switch>
		)
	}
}

export default  Routes;

