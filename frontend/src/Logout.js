import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';

class Logout extends Component{
  componentDidMount() {
    this.clearLocalStorage();
  }

  async clearLocalStorage(){
    localStorage.removeItem('token');
    this.props.checkToken();
  }
  
  render(){
    this.props.history.push("/");
    return null;
  }
}

export default Logout;