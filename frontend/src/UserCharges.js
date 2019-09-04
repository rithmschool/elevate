import React, { Component } from "react";
import ElevateApi from './ElevateApi';
import { Table } from 'react-bootstrap';
import UserCharge from './UserCharge';
import PaymentForm from './PaymentForm';


class UserCharges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      charges: []
    }
    this.handleClickPayment = this.handleClickPayment.bind(this);
  }

  //Get all charges on first render
  async componentDidMount() {

    let { charges } = await ElevateApi.getCharges(this.props.userId);

    this.setState({ charges: charges });
  }
  // Pass click handler to child charges. Display payment form with the charge's id.
  // NOTE: Only ONE Stripe payment form can be active at a time.
  handleClickPayment(evt) {
    evt.preventDefault();
    this.setState({ showForm: true, formCharge: evt.target.id })
  }

  render() {
    let charges;
    if (this.state.charges === 'No outstanding charges') {
      return (
        <div>
          <h2>Payments:</h2>
          <p>No current charges!</p>
        </div>

      )

    }
    else {

      charges = this.state.charges.map(charge =>
        <UserCharge
          key={charge.id}
          id={charge.id}
          amount={charge.amount}
          description={charge.description}
          due_date={charge.due_date}
          handlePayment={this.handleClickPayment}
        />);

      return (
        <div className="container">
          <h1>Payments Due:</h1>
          <Table hover responsive id="users-table">
            <thead>
              <tr>
                <th>Make Payment</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Delete</th>
              </tr>
            </thead>
            {charges}
          </Table>
          {this.state.showForm ? <PaymentForm chargeId={this.state.formCharge} /> : null}
        </div>
      )
    }
  }
}
export default UserCharges;