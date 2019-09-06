import React from "react";
import { Link } from "react-router-dom";
import {Button} from 'reactstrap';
import classNames from 'classnames';
import './SideBar.css'

/** Generic reusable component to show a side bar navigation */
class SideBar extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        isOpen: false
      };
      this.toggle = this.toggle.bind(this);
  }
// switch sidebar on/off
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render(){
    return (
          <div>
          {/* Button to toggle Sidebar */}
          <Button
            color="secondary"
            onClick={this.toggle}>
            <i className="fas fa-th-list"></i>
          </Button>

          {/* Sidebar Navigation */}
          <div className={classNames('sidebar', {'is-open': this.state.isOpen})}>
            <ul className="list-group list-group-flush">
              {this.props.routes.map(route => ( 
                <li key={route.path} className="list-group-item">
                  <Link to={route.path}
                        onClick={this.toggle}>
                        {route.name}
                  </Link>
                </li>))}
            </ul>             
          </div>

        </div>
          
  );
}
}

export default SideBar;
