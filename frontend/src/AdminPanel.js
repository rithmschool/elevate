import React, { Component } from 'react';
import './AdminPanel.css'
import AdminNavBar from './AdminNavBar';

class AdminPanel extends Component {
constructor(props){
  super(props);
  this.state = {view: ""}
}

changeView = (view) => {
  this.setState({view})
}

render(){
  return(
    <div className="admin-panel">
        <h1>Admin Panel</h1>
        <div className="admin-navbar"><AdminNavBar changeView={this.changeView}/></div>
    </div>
  )
}

}

export default AdminPanel;