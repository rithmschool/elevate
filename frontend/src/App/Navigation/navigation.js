import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./navigation.css";
import { UserContext } from "../../userContext";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { thisExpression } from "@babel/types";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.userMenuToggle = this.userMenuToggle.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      userMenuIsOpen: false
    };
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  myRef = React.createRef();

  // Hide user menu when click outside dropdown
  handleClickOutside = e => {
    this.setState({ userMenuIsOpen: false });
  };

  userMenuToggle(evt) {
    this.setState(st => ({ userMenuIsOpen: !st.userMenuIsOpen }));
  }

  render() {
    //NavBar for logged out users
    const loggedOut = (
      <UserContext.Consumer>
        {currentUser =>
          !currentUser && (
            <ul className="navbar-nav justify-content-center navbar-div">
              <li
                className="nav-item active"
                data-toggle="collapse"
                data-target=".in"
              >
                <Link to="/" className="Nav-link Nav-link-ltr">
                  About
                </Link>
              </li>
              <li
                className="nav-item active"
                data-toggle="collapse"
                data-target=".in"
              >
                <Link to="/" className="Nav-link Nav-link-ltr">
                  For Employers
                </Link>
              </li>
              <li
                className="nav-item active"
                data-toggle="collapse"
                data-target=".in"
              >
                <Link to="/login" className="Nav-link Nav-link-ltr">
                  Sign In
                </Link>
              </li>
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
              <li
                className="nav-item active user-item"
                data-toggle="collapse"
                data-target=".in"
              >
                <Link
                  tag={Link}
                  to="/dashboard/manage"
                  className="Nav-link Nav-link-ltr"
                >
                  Manage
                </Link>
              </li>

              <li
                className="nav-item active user-item"
                data-toggle="collapse"
                data-target=".in"
              >
                <Link
                  to="/dashboard/appointments"
                  className="Nav-link Nav-link-ltr"
                >
                  Appointments
                </Link>
              </li>

              <li
                className="nav-item active user-item"
                data-toggle="collapse"
                data-target=".in"
              >
                <Link
                  componentClass={Link}
                  to="/dashboard/templates"
                  className="Nav-link Nav-link-ltr"
                >
                  Templates
                </Link>
              </li>
              <NavDropdown
                id="collasible-nav-dropdown"
                title={<i className="fas fa-user Nav-icon right-content"></i>}
              >
                <div
                  className="list-group list-unstyled"
                  onClick={this.userMenuToggle}
                >
                  <NavDropdown.Item className=" bg-transparent Menu-link">
                    {" "}
                    <Link
                      className="dropdown-link"
                      to={`users/${currentUser.userId}`}
                    >
                      <li className="list-group-item bg-transparent">
                        Profile
                      </li>
                    </Link>
                  </NavDropdown.Item>

                  {currentUser.is_admin ? (
                    <li data-toggle="collapse" data-target=".in">
                      {userIsAdmin}
                    </li>
                  ) : (
                      ""
                    )}

                  <NavDropdown.Item className=" bg-transparent Menu-link">
                    <Link
                      className="dropdown-link"
                      to="/"
                      onClick={this.props.logout}
                    >
                      <li className="list-group-item">Log out</li>
                    </Link>
                  </NavDropdown.Item>
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
            <NavDropdown.Item className="bg-transparent Menu-link">
              {" "}
              <Link className="dropdown-link" to="/admin/users">
                <li className="list-group-item">Admin</li>
              </Link>
            </NavDropdown.Item>
          ) : (
              ""
            )
        }
      </UserContext.Consumer>
    );

    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>
          <Link className="Nav_brand-name" to="/">
            Brella
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          isOpen={this.state.userMenuIsOpen}
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
