import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
  import {Link} from 'react-router-dom'


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
        
          <Navbar color="transparent" light expand="md" >
            <NavbarBrand href="/">Elevate</NavbarBrand>

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem >
                  <NavLink to="/link1" >Get Started</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/link2">How it Works</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/link3">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/link3">Help</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/link3">Sign in</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
          </Navbar>
         
        </div>
    );
  }
  render() {
    return (
      this.props.currentUser ? this.loggedInNavbar(): this.loggedOutNavbar()
    )
  }
}