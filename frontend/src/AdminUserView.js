import React, { Component } from "react";
import './AdminUserView.css';
import InvoiceForm from './InvoiceForm';
import ChargeList from './ChargeList'
class AdminUserView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      showForm:true
    })
  }
  render() {
    
    const { first_name, last_name, email, current_company, hire_date, needs, goals } = this.props.user;
    if (this.state.showForm) {
      return (
        <div>
        <InvoiceForm user={this.props.user} />
      
        </div>
      )
    }
    return (
      <div className='AdminUserView'>
        <div>
          <button onClick={this.handleClick} id="InvoiceButton">Add a new charge</button>
        </div>
        <div>
          <h5>{first_name} {last_name}</h5>
          <p>Email: {email}</p>
          <p>Current Company: {current_company}</p>
          <p>Hire Date: {hire_date}</p>
          <p>Needs: {needs}</p>
          <p>Goals: {goals}</p>
          <div>Questions: </div>
          <div>Charges:</div>
          </div>
      </div>
    )
  }
}

export default AdminUserView;