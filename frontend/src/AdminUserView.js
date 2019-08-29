import React, { Component } from "react";
import './AdminUserView.css';
import InvoiceForm from './InvoiceForm';
import ElevateApi from './ElevateApi';
import { Table } from 'react-bootstrap';
import AdminPanelCharges from './AdminPanelCharges';

class AdminUserView extends Component {
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
    let { charges } = await ElevateApi.allChargesForUser(this.props.user.id);

    this.setState({ charges })
  }

  handleClick() {
    this.setState({
      showForm: true
    })
  }
  render() {
    let charges;
    if (this.state.charges === 'No charges') {

      charges = "No current charges";
    }
    else {
      charges = this.state.charges.map(charge =>
        <AdminPanelCharges
          key={charge.id}
          id={charge.id}
          amount={charge.amount}
          description={charge.description}
          due_date={charge.due_date}
          paid={charge.paid}
          payment_date={charge.payment_date}
        />);
    }


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

          <div>
            <br></br>
            <strong>Charges:</strong>
            <Table striped bordered hover size="sm" responsive id="users-table">
              <thead>
                <tr>
                  <th>Payment Date</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              {charges}
            </Table>

          </div>
        </div>
      </div>
    )
  }
}


export default AdminUserView;