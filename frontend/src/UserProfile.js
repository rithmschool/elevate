import React from 'react';
import { NavItem, NavLink, Nav } from 'reactstrap';
import {Link} from 'react-router-dom';


class UserProfile extends React.Component {
  state = { activeItem: 'My Comp Overview' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
    <div className="row">
      <Nav vertical>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
          <Link to="/#" activeClassName="selected">
            My Comp overview
          </Link>
          </li>
          <li class="list-group-item">
            <Link to="#">My Offers</Link>
          </li>
          <li class="list-group-item">
            <Link to="#">Upload an offer</Link>
          </li>
        </ul>
      </Nav>
    </div>
      
    )
  }
}

export default UserProfile;
