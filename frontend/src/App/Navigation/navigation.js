import React from "react";
import { Link } from "react-router-dom";
import "./navigation.scss";
import { UserContext } from "../../userContext";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Navigation extends React.Component {
  render() {
    //NavBar for logged out users
    const loggedOut = (
      <UserContext.Consumer>
        {currentUser =>
          !currentUser && (
            <ul className="navbar-nav justify-content-center navbar-div">
              <Link to="/" className="Nav-link Nav-link-ltr">
                About
              </Link>
              <Link to="/" className="Nav-link Nav-link-ltr">
                For Employers
              </Link>
              <Link to="/login" className="Nav-link Nav-link-ltr">
                Sign In
              </Link>
            </ul>
          )
        }
      </UserContext.Consumer>
    );

    //NavBar for logged in users
    const userIsLoggedIn = (
      <UserContext.Consumer>
        {currentUser =>
          currentUser && (
            <ul className="navbar-nav justify-content-center navbar-div">
              <Link
                tag={Link}
                to="/dashboard/manage"
                className="Nav-link Nav-link-ltr"
              >
                Manage
              </Link>
              <Link
                to="/dashboard/appointments"
                className="Nav-link Nav-link-ltr"
              >
                Appointments
              </Link>
              <Link to="/dashboard/templates" className="Nav-link Nav-link-ltr">
                Templates
              </Link>
              <NavDropdown
                id="collasible-nav-dropdown"
                title={<i className="fas fa-user Nav-icon right-content"></i>}
              >
                <div
                  className="list-group list-unstyled"
                  onClick={this.userMenuToggle}
                >
                  <LinkContainer
                    className="border dropdown-link"
                    to={`users/${currentUser.userId}`}
                  >
                    <NavDropdown.Item className="bg-transparent Menu-link">
                      <li className="list-group-item bg-transparent">
                        Profile
                      </li>
                    </NavDropdown.Item>
                  </LinkContainer>

                  {currentUser.is_admin ? (
                    <li className="border dropdown-link list-group-item">
                      {userIsAdmin}
                    </li>
                  ) : (
                    ""
                  )}
                  <LinkContainer
                    className="border dropdown-link"
                    onClick={this.props.logout}
                    to="/"
                  >
                    <NavDropdown.Item className="bg-transparent Menu-link">
                      <li className="list-group-item bg-transparent">
                        Log out
                      </li>
                    </NavDropdown.Item>
                  </LinkContainer>
                </div>
              </NavDropdown>
            </ul>
          )
        }
      </UserContext.Consumer>
    );

    //Additional Drop Down Item for Admins
    const userIsAdmin = (
      <UserContext.Consumer>
        {currentUser =>
          currentUser && currentUser.is_admin ? (
            <LinkContainer to="/dashboard/admin" className="dropdown-link">
              <NavDropdown.Item className="bg-transparent Menu-link">
                Admin
              </NavDropdown.Item>
            </LinkContainer>
          ) : (
            ""
          )
        }
      </UserContext.Consumer>
    );

    return (
      <Navbar
        className="navigation"
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
      >
        <Navbar.Brand>
          <Link className="Nav_brand-name" to="/">
            Brella
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="collapse.navbar-collapse"
        >
          <Nav className="ml-auto" variant="light">
            {loggedOut}
            {userIsLoggedIn}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
