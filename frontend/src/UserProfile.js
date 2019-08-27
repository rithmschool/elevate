import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './UserProfile.css'
import {Button} from 'reactstrap';
import classNames from 'classnames';
import routes from './SideBarRoutes'


class UserProfile extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        isOpen: false
      };
      this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render(){

    return (
      <Router>
        <div style={{ position: 'relative', margin: '10px'}}>
          
          {/* Button to toggle Sidebar */}
          <Button
            color="secondary"
            onClick={this.toggle}>
            <i className="fas fa-th-list"></i>
          </Button>

          {/* Sidebar Navigation */}
          <div className={classNames('sidebar', {'is-open': this.state.isOpen})}>
            <ul className="list-group list-group-flush">
              {routes.map(route => ( 
                <li key={route.path} className="list-group-item">
                  <Link to={route.path}
                        onClick={this.toggle}>
                        {route.name}
                  </Link>
                </li>))}
            </ul>             
          </div>

          {/* render sidebar routes */}
          <div style={{ flex: 1, padding: "10px" }}>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.content}
              />
            ))}
          </div>
        </div>
          
      </Router>
  );
}
}

export default UserProfile;
