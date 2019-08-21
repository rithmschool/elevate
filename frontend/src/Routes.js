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

<<<<<<< HEAD
export default Routes;

=======
export default  Routes;
>>>>>>> d87bd30473142177c837d7485b25b5982fa4374f
