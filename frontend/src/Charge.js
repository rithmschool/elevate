import React from "react";
import CheckoutForm from './CheckoutForm';

// Show details of a single charge. If "Pay Now" button is clicked,
// Render the form to input credit card
class Charge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentForm: false
    }

    this.handlePayment = this.handlePayment.bind(this);

  }
  // Show payment form.
  handlePayment() {
    this.setState({
      paymentForm: true
    });
  }

  render() {
    const { amount, description, due_date } = this.props
    return (
      <div >
        Description: {description}, <br></br>
        Due Date: {due_date} <br></br>
        Amount: {amount}<br></br>
        <button onClick={this.handlePayment}>Pay Now</button>
        ______________________ <br></br>
        {this.state.paymentForm ? <CheckoutForm chargeId={this.props.charge.id} /> : null}
      </div>
    );
  }
}

export default Charge;