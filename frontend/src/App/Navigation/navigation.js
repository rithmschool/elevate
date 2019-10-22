import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./navigation.css";
import { Collapse, Navbar, NavbarToggler } from "reactstrap";
import { UserContext } from "../../userContext";

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

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
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
    const userIsLoggedIn = (
      <UserContext.Consumer>
        {currentUser => (
          <li className="nav-item active">
            {currentUser ? (
              <div>
                <i
                  className="fas fa-user Nav-icon"
                  onClick={this.userMenuToggle}
                ></i>

                <div
                  ref={this.myRef}
                  className={classNames("userMenu", {
                    "is-open": this.state.userMenuIsOpen
                  })}
                >
                  <ul
                    className="list-group list-group-flush"
                    onClick={this.userMenuToggle}
                  >
                    <li className="list-group-item bg-transparent">
                      <Link
                        to={`users/${currentUser.userId}`}
                        className="Menu-link "
                      >
                        Profile
                      </Link>
                    </li>

                    <li className="list-group-item bg-transparent">
                      <Link
                        className="Menu-link "
                        to="/"
                        onClick={this.props.logout}
                      >
                        Log out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div ref={this.myRef}>
                <Link to="/login" className="Nav-link Nav-link-ltr">
                  Sign In
                </Link>
              </div>
            )}
          </li>
        )}
      </UserContext.Consumer>
    );

    const userIsAdmin = (
      <UserContext.Consumer>
        {currentUser =>
          currentUser &&
          currentUser.is_admin && (
            <li className="nav-item adminStyle danger active">
              <Link
                className="Nav-text Nav-link Nav-link-ltr"
                to="/admin/users"
              >
                **Admin**
              </Link>
            </li>
          )
        }
      </UserContext.Consumer>
    );

    return (
      <Navbar color="light" light expand="md">
        <Link className="Nav_brand-name" to="/">
          Brella
        </Link>

        <NavbarToggler onClick={this.toggle} />

        <Collapse
          isOpen={this.state.isOpen}
          navbar
          className="collapse.navbar-collapse"
        >
          <ul className="navbar-nav ml-auto">
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
          </ul>
          <ul className="navbar-nav">
            {userIsAdmin}

            {userIsLoggedIn}
          </ul>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
