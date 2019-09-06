import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import './Navigation.css'
import { Collapse, Navbar, NavbarToggler} from 'reactstrap';
import { UserContext, AdminContext} from "./UserContext";


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

  // Hide user menu when click outside
  handleClickOutside = e => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ userMenuIsOpen: false });
    }
  };
  //toggle for the navbar
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
// toggle for the user menu
  userMenuToggle() {
    this.setState({
      userMenuIsOpen: !this.state.userMenuIsOpen
    });
  }

  render() {

    // check if user is connected to display wether sign in or logout on navbar
      
    const login = (
      <UserContext.Consumer>
        {currentUser => (
          <li className="nav-item active">
            { currentUser ?

            <div>
              <i className="fas fa-user Nav-icon" 
              onClick={this.userMenuToggle}
              ></i>
              <div className={classNames('userMenu', {'is-open': this.state.userMenuIsOpen})}
                ref={this.myRef}>
                <ul className="list-group list-group-flush" onClick={this.userMenuToggle}>
                  {/* you can use these 3 lines below as a template and add menu items as you want
                  but you need to change Link route and the title to display. */}
                  <li className="list-group-item bg-transparent">
                    <Link to={`users/${currentUser.userId}`} className="Menu-link ">Profile</Link>
                  </li>
                  
                  <li className="list-group-item bg-transparent">
                  <Link className="Menu-link " to="/" onClick={this.props.logout}>
                    Log out
                  </Link>
                  </li>
                </ul> 
              </div>
            </div >:
            <div ref={this.myRef}>
              <Link to="/login" className="Nav-link Nav-link-ltr" >Sign In</Link>
              </div>
            }
          </li>
        )}
      </UserContext.Consumer>
    )
    
    // check if Admin is connected to display admin panel link on navbar
    const admin = (
      <AdminContext.Consumer>
        {isAdmin => (
          <li className="nav-item active">
            { isAdmin ?  
              <Link to="/admin" className="Nav-text Nav-link Nav-link-ltr">Admin</Link> : ''
            }
          </li>
        )}
      </AdminContext.Consumer>
    );

    return(
      <Navbar color="light" light expand="md">
        <Link className="navbar-brand Nav-text" to="/">Super Agent</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar className="collapse.navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active " data-toggle="collapse" data-target=".in" >
              <Link to="/link1" className="Nav-link Nav-link-ltr">Get Started</Link>
            </li>
            <li className="nav-item active">
            <Link to="/link2" className="Nav-link Nav-link-ltr ">How it Works</Link>
            </li>
            <li className="nav-item active">
              <Link to="/link3" className="Nav-text Nav-link Nav-link-ltr">About</Link>
            </li>
            {admin}
            </ul>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/link3" className="Nav-link Nav-link-ltr">Help</Link>
            </li>
            {login}
          </ul>   
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;