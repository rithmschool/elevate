import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import ElevateApi from "./ElevateApi";

// Form for a user to input credit card details. 
class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      response: ""
    };

    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // Use stripe API to tokenize credit card information
    let { token } = await this.props.stripe.createToken();
    // If token is undefined, don't do anything
    if (token === undefined) {
    }
    // If there is a token, process payment
    else {

      // Attempt stripe payment
      console.log(this.props)
      let response = await ElevateApi.makePayment(token.id, this.props.id);

      // On successful transaction:
      if (response.status === "succeeded") console.log("Purchase Complete!")
      if (response.status === "succeeded") this.setState({ complete: true });
      else {
        this.setState({ response })

      }
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>

    return (
      <div className="checkout">
        <h1> {this.state.response}</h1>
        <p>Enter your payment information:</p>
        {/* CardElement is Stripe's credit card input form */}
        <div style={{ maxWidth: '350px' }}>
          <CardElement />
        </div>
        <button onClick={this.submit}>Process Payment</button>
      </div>
    );
  }
}


export default injectStripe(PaymentForm);