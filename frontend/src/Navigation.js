import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
  import {Link} from 'react-router-dom';
  import './Navigation.css'


export default class Navigation extends React.Component {
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

  loggedInNavbar(){
    return(
      <div>
          <Navbar color="transparent" light expand="md">
            <NavbarBrand href="/">Elevate</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/">Get Started</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/logout" onClick={this.props.logout}>Logout</NavLink>
            </NavItem>
          </Nav>
            </Collapse>
          </Navbar>
          
        </div>
    );
  }

  loggedOutNavbar(){
    return(
      <div>
        
          <Navbar  light expand="md"  >
            <NavbarBrand href="/">LOGO</NavbarBrand>

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar >
                <NavItem className="Navigation">
                  <Link to="/link1" >Get Started</Link>
                </NavItem >
                <NavItem className="Navigation"> 
                  <Link to="/link2">How it Works</Link>
                </NavItem>
                <NavItem className="Navigation">
                  <Link to="/link3">About</Link>
                </NavItem>
                <NavItem className="Navigation">
                  <Link to="/link3">Help</Link>
                </NavItem>
                <NavItem className="Navigation">
                  <Link to="/link3">Sign in</Link>
                </NavItem>
                </Nav>
            </Collapse>
          </Navbar>
         <hr></hr>
        </div>
    );
  }
  render() {
    return (
      this.props.currentUser ? this.loggedInNavbar(): this.loggedOutNavbar()
    )
  }
}