import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

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
              <NavLink href="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/logout" onClick={this.props.logout}>Logout</NavLink>
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
          <Navbar color="transparent" light expand="md">
            <NavbarBrand href="/">Elevate</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/link1">Link1</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/link2">Link2</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/link3">Link3</NavLink>
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