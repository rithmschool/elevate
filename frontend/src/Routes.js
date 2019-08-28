import React from 'react';
import {  Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import LogInSignUpForm from'./LogInSignUpForm';
import Logout from './Logout';
import AdminPanel from './AdminPanel';
import AdminPrivateRoute from "./AdminPrivateRoute";


class Routes extends React.Component {

	render(){
		return(
			<Switch>
				<Route exact path="/" render={props => <Home {...props} />} />
				<Route exact path="/login" render={props => <LogInSignUpForm {...props} getCurrentUser={this.props.getCurrentUser}/>} />
				<AdminPrivateRoute exact path="/admin" render={() => <AdminPanel />} />
				<Route exact path="/logout" render={() => <Logout getCurrentUser={this.props.getCurrentUser}/>} />
				<Redirect to="/" />
			</Switch>
		)
	}
}

export default  Routes;

