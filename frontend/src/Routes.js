import React from 'react';
import {  Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import AdminPanel from './AdminPanel';
import UserProfile from './UserProfile';
import LogInSignUpForm from'./LogInSignUpForm';
import Logout from './Logout';
import AdminPanel from './AdminPanel'

class Routes extends React.Component {

	render(){
		return(
			<Switch>
				<Route exact path="/" render={props => <Home {...props} />} />
				<Route excat path="/profile"  render={props => <UserProfile {...props} />} />
				<Route exact path="/login" render={props => <LogInSignUpForm {...props} checkToken={this.props.checkToken}/>} />
				<Route exact path="/admin" render={() => <AdminPanel />} />
				<Route exact path="/logout" render={() => <Logout checkToken={this.props.checkToken}/>} />
				<Redirect to="/" />
			</Switch>
		)
	}
}

export default  Routes;
