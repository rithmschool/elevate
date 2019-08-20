import React, { Component } from 'react';
import {  Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import LoginForm from './LoginForm';
import Profile from './Profile';




export default class Routes extends Component {


	render(){
		return(
			<Switch>
				<Route exact path="/" render={
					() => <Home />}/>/>

				<Route exact path="/login"
										render={<LoginForm />} />
				<Route exact path="/profile"
										render={ <Profile/>}/>

				<Redirect to="/" />
			</Switch>
		)
}

}

