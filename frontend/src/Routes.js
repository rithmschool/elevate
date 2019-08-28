import React from 'react';
import {  Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import UserProfile from './UserProfile';
import LogInSignUpForm from'./LogInSignUpForm';
import AdminPanel from './AdminPanel';
import AdminPrivateRoute from "./AdminPrivateRoute";


class Routes extends React.Component {

	render(){
		return(
			<Switch>
<<<<<<< HEAD
				<Route exact path="/" render={props => <Home {...props} />} />
				<Route excat path="/profile"  render={props => <UserProfile {...props} />} />
				<Route exact path="/login" render={props => <LogInSignUpForm {...props} checkToken={this.props.checkToken}/>} />
				<Route exact path="/admin" render={() => <AdminPanel />} />
				<Route exact path="/logout" render={() => <Logout checkToken={this.props.checkToken}/>} />
=======
				<Route exact path="/" render={props =>
					(<Home {...props} />)}/>

				<Route exact path="/login" render={props => 
					(<LogInSignUpForm {...props} getCurrentUser={this.props.getCurrentUser}/>)}/>

				<AdminPrivateRoute exact path="/admin" render={() =>
					 (<AdminPanel />)}/>

>>>>>>> 299b69b3c5275131cd61199d4cb9e370031995a7
				<Redirect to="/" />
			</Switch>
		)
	}
}

export default  Routes;

