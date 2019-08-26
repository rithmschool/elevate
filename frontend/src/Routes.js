import React from 'react';
import {  Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import LogInSignUpForm from'./LogInSignUpForm'
class Routes extends React.Component {

	render(){
		return(
			<Switch>
				<Route exact path="/" render={props => <Home {...props} />} />
				<Route exact path="/login" render={() => <LogInSignUpForm />} />
				<Redirect to="/" />
			</Switch>
		)
	}
}

export default  Routes;
