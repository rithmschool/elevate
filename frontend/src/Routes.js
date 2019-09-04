import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import UserProfile from './UserProfile';
import LogInSignUpForm from'./LogInSignUpForm';
import AdminPanel from './AdminPanel';
import AdminPrivateRoute from "./AdminPrivateRoute";
import UserPrivateRoute from './UserPrivateRoute';


class Routes extends React.Component {

	render() {
		return (
			<Switch>
				<Route exact path="/" render={props =>
					(<Home {...props} getCurrentUser={this.props.getCurrentUser} />)} />

				<Route exact path="/login" render={props =>
					(<LogInSignUpForm {...props} getCurrentUser={this.props.getCurrentUser} />)} />

				<AdminPrivateRoute exact path="/admin" render={props =>
					 (<AdminPanel {...props} />)}/>

				<UserPrivateRoute
					path="/users/:userId"
					render={props =>
						(<UserProfile {...props} />)}/>

				<Redirect to="/" />
			</Switch>
		)
	}
}

export default Routes;

