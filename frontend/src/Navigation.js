import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css'
import { Collapse, Navbar, NavbarToggler} from 'reactstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const logout = <Link to="/logout" className="Nav-link Nav-link-ltr">Logout</Link>
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