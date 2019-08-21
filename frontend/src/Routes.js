import React from 'react';
import {  Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';





class Routes extends React.Component {


	render(){
		return(
			<Switch>
				<Route exact path="/" render={props => <Home {...props} />} />
				<Redirect to="/" />
			</Switch>
		)
	}
}

export default Routes;

