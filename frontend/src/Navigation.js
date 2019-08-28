import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import './Navigation.css'
import { Collapse, Navbar, NavbarToggler} from 'reactstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.userMenuToggle = this.userMenuToggle.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      userMenuIsOpen: false
    };
  }
  //toggle for the navbar
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
// toggle for the user drop down menu
  userMenuToggle() {
    this.setState({
      userMenuIsOpen: !this.state.userMenuIsOpen
    });
  }

  render() {
    const userId =  this.props.user.userId
    const logout = 
            <div>
              <i className="fas fa-user Nav-icon"
              onClick={this.userMenuToggle}
              ></i>
              <div className={classNames('userMenu', {'is-open': this.state.userMenuIsOpen})}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent">
                  <Link to={`${userId}/profile`} className="Menu-link ">Profile</Link>
                </li>
                <li className="list-group-item bg-transparent">
                <Link to="/logout" className="Menu-link ">Logout</Link>
                </li>
              </ul> 
              </div>
            </div>
      
    const login = <Link to="/login" className="Nav-link Nav-link-ltr">Sign In</Link>
    const admin = (
      <li className="nav-item active">
        <Link to="/admin" className="Nav-text Nav-link Nav-link-ltr">Admin</Link>
      </li>
    )

    return(
      <Navbar color="light" light expand="md">
        <Link className="navbar-brand Nav-text" to="/">Super Agent</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar className="collapse.navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active ">
              <Link to="/link1" className="Nav-link Nav-link-ltr">Get Started</Link>
            </li>
            <li className="nav-item active">
            <Link to="/link2" className="Nav-link Nav-link-ltr ">How it Works</Link>
            </li>
            <li className="nav-item active">
              <Link to="/link3" className="Nav-text Nav-link Nav-link-ltr">About</Link>
            </li>
            { this.props.user && this.props.user.is_admin ? admin : '' }
            </ul>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/link3" className="Nav-link Nav-link-ltr">Help</Link>
            </li>
            <li className="nav-item active">
              {this.props.isLoggedin ? logout : login }
            </li>
          </ul>   
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;