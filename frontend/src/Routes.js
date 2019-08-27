import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import LogInSignUpForm from './LogInSignUpForm';
import Logout from './Logout';
import AdminPanel from './AdminPanel'

class Routes extends React.Component {

	render() {
		return (
			<Switch>
				<Route exact path="/" render={props => <Home {...props} isLoggedIn={this.props.isLoggedIn} />} />
				<Route exact path="/login" render={props => <LogInSignUpForm {...props} checkToken={this.props.checkToken} />} />
				<Route exact path="/admin" render={() => this.props.user && this.props.user.is_admin ? <AdminPanel /> : <LogInSignUpForm />} />
				<Route exact path="/logout" render={props => <Logout {...props} checkToken={this.props.checkToken}/>} />
				<Redirect to="/" />
			</Switch>
		)
	}
}

export default Routes;
