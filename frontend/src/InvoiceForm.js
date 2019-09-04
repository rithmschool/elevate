import React, { Component } from 'react';
import ElevateApi from './ElevateApi';

// Creates a form for creating a new charge. 
// Validates user_id and amount fields on submit. Corrects validation on change.
class InvoiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentSubmited: false,
      formValid: {
        user_id: true,
        amount: true
      },
      invoice: {
        user_id: 0,
        amount: "",
        description: "",
        due_date: ""
      },
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    this.setState({ email: this.props.user.email })
  }

  handleChange(e) {
    let newState = this.state;

    // If amount is currently invalid
    if (this.state.formValid.amount === false) {

      // If input is amount and input is now valid
      if (e.target.name === 'amount' && e.target.value > 0) {
        newState = {
          ...this.state,
          formValid: { ...newState.formValid, amount: true },
          invoice: { ...newState.invoice, [e.target.name]: e.target.value }
        }
        this.setState({ ...newState })
      }

      // If input is not now valid, update form with input
      else {
        this.setState({ ...newState, invoice: { ...newState.invoice, [e.target.name]: e.target.value } });
      }
    }

    // If inputs are all valid, update form with inputs
    else {
      this.setState({ ...newState, invoice: { ...newState.invoice, [e.target.name]: e.target.value } });
    }
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    let newState = this.state;

    // Validate amount
    if (this.state.invoice.amount <= 0) {
      newState.formValid.amount = false;
      this.setState({ ...newState })
    }

    // If all inputs valid:
    else if (this.state.formValid.amount === true) {
      // Replace user email with user id
      newState = {
        ...newState,
        invoice: {
          ...newState.invoice,
          user_id: this.props.user.id
        }
      }

      let resp = await ElevateApi.addCharge({ invoice: newState.invoice });
      if (resp) {
        this.setState({
          paymentSubmited: true
        })
      }
    }
  }

  render() {
    if (this.state.paymentSubmited) {
      return (
        <div><h1>Charge was sent!</h1>
        </div>
      )
    }
    return (
      <div>
        {/* drop down for email/user */}
        <div className="form-group">
          <label>Charge User:</label>
          <input
            name="user_id"
            className="form-control"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <p name="error message" style={{ color: "red" }} >{this.state.formValid.user_id ? null : "user_id invalid. Please try again."}</p>

        <div className="form-group">
          <label>Amount Due:</label>
          <input
            name="amount"
            className="form-control"
            value={this.state.invoice.amount}
            onChange={this.handleChange}
          />
        </div>
        <p name="error message" style={{ color: "red" }} >{this.state.formValid.amount ? null : "Please input an amount."}</p>
        <div className="form-group">
          <label>Charge Details:</label>
          <input
            name="description"
            className="form-control"
            value={this.state.invoice.description}
            onChange={this.handleChange}
          />
        </div>
        {/* drop down menue for due date */}
        <div className="form-group">
          <label>Due Date:</label>
          <input
            name="due_date"
            className="form-control"
            value={this.state.invoice.due_date}
            onChange={this.handleChange}
            type="date"
          />
        </div>
        <button onClick={this.handleSubmit}>Submit Charge</button>
      </div >

    )

  }
}


export default InvoiceForm; 