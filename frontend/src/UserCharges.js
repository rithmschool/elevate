import React, { Component } from "react";
import ElevateApi from './ElevateApi';
import { Table } from 'react-bootstrap';
import AdminPanelCharges from './AdminPanelCharges';

class UserCharges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      charges: []
    }
    this.handleClick = this.handleClick.bind(this);
  }
  //Get all charges on first render
  async componentDidMount() {
    
    let { charges } = await ElevateApi.getCharges(this.props.user.id);
   
    this.setState({ charges})
  }

  render() {
      return(
        <div>
            <h1>Payments Due:</h1>

            </div>
      )
  }
}