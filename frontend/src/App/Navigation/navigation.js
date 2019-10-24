import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./navigation.css";
import { UserContext } from "../../userContext";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.userMenuToggle = this.userMenuToggle.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
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
    this.setState({ userMenuIsOpen: false });
  };

  userMenuToggle(evt) {
    if (this.state.userMenuIsOpen) {
      console.log("a")
      this.handleClickOutside()
    } else {
      console.log(this.state)
      this.handleClickOutside()
    this.setState(st => ({ userMenuIsOpen: !st.userMenuIsOpen }))
  };
    console.log(this.state.userMenuIsOpen)
  }


  render() {

    //NavBar for logged out users 
    const loggedOut = (
      <UserContext.Consumer>
        {currentUser => (!currentUser) && (
          <div ref={this.myRef}>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active" data-toggle="collapse" data-target=".in">
                <Link to="/" className="Nav-link Nav-link-ltr">
                  About
              </Link>
              </li>
              <li className="nav-item active" data-toggle="collapse" data-target=".in">
                <Link to="/" className="Nav-link Nav-link-ltr">
                  For Employers
              </Link>
              </li>
              <li className="nav-item active" data-toggle="collapse" data-target=".in">
                <Link to="/login" className="Nav-link Nav-link-ltr">
                  Sign In
              </Link>
              </li>
            </ul>
          </div>
        )}
      </UserContext.Consumer>
    );

    //NavBar for logged in users
    const userIsLoggedIn = (
      <UserContext.Consumer>
        {currentUser => currentUser && (
          <li className="nav-item active ">
            <div>
              <ul className="navbar-nav">

                <li className="nav-item active user-item" data-toggle="collapse" data-target=".in">
                  <Link
                    tag={Link} to="/dashboard/manage" className="Nav-link Nav-link-ltr">
                    Manage
                  </Link>
                </li>

                <li className="nav-item active user-item" data-toggle="collapse" data-target=".in">
                  <Link to="/dashboard/appointments" className="Nav-link Nav-link-ltr">
                    Appointments
                  </Link>
                </li>

                <li
                  className="nav-item active user-item" data-toggle="collapse" data-target=".in">
                  <Link componentClass={Link} to="/dashboard/templates" className="Nav-link Nav-link-ltr">
                    Templates
                  </Link>
                </li>
                <div onClick={this.closeMenu}>
                  <li className="nav-item active" data-toggle="collapse" data-target=".in">
                    <i className="fas fa-user Nav-icon right-content" onClick={this.userMenuToggle}>
                    </i>
                  </li>
                </div>
              </ul>

              <div ref={this.myRef}
                className={classNames("userMenu collasible-nav-dropdown", {
                  "is-open collasible-nav-dropdown": this.state.userMenuIsOpen
                })}
              >
                <ul className="list-group list-unstyled" onClick={this.userMenuToggle}>
                  <NavDropdown.Item className="list-group-item bg-transparent Menu-link"> <Link className="dropdown-link" to={`users/${currentUser.userId}`}
                  ><li className="list-group-item bg-transparent">Profile</li></Link></NavDropdown.Item>

                  {currentUser.is_admin ?
                    (<li data-toggle="collapse" data-target=".in">
                      {userIsAdmin}
                    </li>) : ""}

                  <NavDropdown.Item className="list-group-item bg-transparent Menu-link"><Link className="dropdown-link" to="/" onClick={this.props.logout}><li className="list-group-item">
                    Log out
                  </li></Link></NavDropdown.Item>
                </ul>
              </div>
            </div>
          </li>
        )}
      </UserContext.Consumer>
    );

    //Additional Drop Down Item for Admins
    const userIsAdmin = (
      <UserContext.Consumer>
        {currentUser => currentUser && currentUser.is_admin ? (
          <NavDropdown.Item className="list-group-item bg-transparent Menu-link"> <Link className="dropdown-link" to="/admin"><li className="list-group-item">
            Admin
              </li ></Link>
          </NavDropdown.Item>
        ) : ""
        }
      </UserContext.Consumer>
    );

    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand><Link className="Nav_brand-name" to="/"> Brella </Link></Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" isOpen={this.state.userMenuIsOpen} className="collapse.navbar-collapse"
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