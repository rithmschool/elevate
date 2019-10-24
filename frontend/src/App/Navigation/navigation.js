import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./navigation.css";
import { Collapse, NavbarToggler } from "reactstrap";
import { UserContext } from "../../userContext";
import { thisTypeAnnotation, thisExpression } from "@babel/types";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.userMenuToggle = this.userMenuToggle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      isOpen: false,
      userMenuIsOpen: false
    };
  }

  async componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  async componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  myRef = React.createRef();

  // Hide user menu when click outside dropdown
  handleClickOutside = e => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ userMenuIsOpen: false });
    }
  };

  toggle() {
    this.setState(st => ({ isOpen: !st.isOpen }));
  }

  userMenuToggle(evt) {
    this.setState(st => ({ userMenuIsOpen: !st.userMenuIsOpen }));
  }

  render() {

    const loggedOut = (
      <UserContext.Consumer>
        {currentUser => (!currentUser) && (
          <div ref={this.myRef}>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active" data-toggle="collapse" data-target=".in">
              <Nav.Link href="/" className="Nav-link Nav-link-ltr">
                  About
              </Nav.Link>
              </li>
              <li className="nav-item active" data-toggle="collapse" data-target=".in">
              <Nav.Link href="/" className="Nav-link Nav-link-ltr">
                  For Employers
              </Nav.Link>
              </li>
              <li className="nav-item active" data-toggle="collapse" data-target=".in">
                <Nav.Link href="/login" className="Nav-link Nav-link-ltr">
                  Sign In
              </Nav.Link>
              </li>
            </ul>
          </div>
        )}
      </UserContext.Consumer>
    );

    const userIsLoggedIn = (
      <UserContext.Consumer>
        {currentUser => currentUser && (
          <li className="nav-item active ">
            <div>
              <ul className="navbar-nav">

                <li className="nav-item active user-item" data-toggle="collapse" data-target=".in">
                  <Nav.Link
                    href="/dashboard/manage" className="Nav-link Nav-link-ltr">
                    Manage
                  </Nav.Link>
                </li>

                <li className="nav-item active user-item" data-toggle="collapse" data-target=".in">
                  <Nav.Link to="/dashboard/appointments" className="Nav-link Nav-link-ltr">
                    Appointments
                  </Nav.Link>
                </li>

                <li
                  className="nav-item active user-item" data-toggle="collapse" data-target=".in">
                  <Nav.Link href="/dashboard/templates" className="Nav-link Nav-link-ltr">
                    Templates
                  </Nav.Link>
                </li>

                <li className="nav-item active" data-toggle="collapse" data-target=".in">
                  <i className="fas fa-user Nav-icon right-content" onClick={this.userMenuToggle}>
                  </i>
                </li>
              </ul>
              <div ref={this.myRef}
                className={classNames("userMenu collasible-nav-dropdown", {
                  "is-open collasible-nav-dropdown": this.state.userMenuIsOpen
                })}
              >
                <ul className="list-group list-unstyled" onClick={this.userMenuToggle}>
                  <li className="list-group-item bg-transparent">
                    <NavDropdown.Item to={`users/${currentUser.userId}`} className="Menu-link">Profile</NavDropdown.Item>
                  </li>

                  <li className="list-group-item bg-transparent" data-toggle="collapse" data-target=".in">
                    {userIsAdmin}
                  </li>

                  <li className="list-group-item bg-transparent">
                    <NavDropdown.Item className="Menu-link" href="/" onClick={this.props.logout}>
                      Log out
                    </NavDropdown.Item>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        )}
      </UserContext.Consumer>
    );

    const userIsAdmin = (
      <UserContext.Consumer>
        {currentUser => currentUser && currentUser.is_admin && (
            <li className="nav-item danger active">
              <NavDropdown.Item className="Menu-link" href="/admin">
                Admin
              </NavDropdown.Item>
            </li>
          )
        }
      </UserContext.Consumer>
    );

    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand><Link className="Nav_brand-name" to="/"> Brella </Link></Navbar.Brand>

        <Navbar.Toggle onClick={this.toggle} aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" isOpen={this.state.isOpen} className="collapse.navbar-collapse"
        >
          <Nav className="ml-auto" variant="light">
            <ul className="navbar-nav justify-content-center">

              {loggedOut}
              {userIsLoggedIn}

            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;