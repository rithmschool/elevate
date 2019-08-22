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
/** Navbar appears when user is logged in */

  loggedInNavbar(){
    return(
      <Navbar color="light" light expand="md">
        <Link className="navbar-brand Nav-text" to="/">Super Agent</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          <ul className="navbar-nav mr-auto ">
            <li className="nav-item ">
              <Link to="/link1" className="Nav-link Nav-link-ltr">Our Mission</Link>
            </li>
            <li className="nav-item active">
            <Link to="/link2" className="Nav-link Nav-link-ltr ">How it Works</Link>
            </li>
            <li className="nav-item active">
              <Link to="/link3" className="Nav-text Nav-link Nav-link-ltr">Explore</Link>
            </li>
            </ul>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/link3" className="Nav-link Nav-link-ltr">Help</Link>
            </li>
            <li className="nav-item active">
              <Link to="/link3" className="fas fa-user Nav-icon"></Link>
            </li>
          </ul>   
        </Collapse>
      </Navbar>
    );
                        
  }
/** Navbar appears when user is logged out */
  loggedOutNavbar(){
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
            </ul>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/link3" className="Nav-link Nav-link-ltr">Help</Link>
            </li>
            <li className="nav-item active">
              <Link to="/link3" className="Nav-link Nav-link-ltr"> Sign In</Link>
            </li>
          </ul>   
        </Collapse>
      </Navbar>
    );
  }
  render() {
    return (
      this.loggedInNavbar()
    )
  }
}

export default Navigation;