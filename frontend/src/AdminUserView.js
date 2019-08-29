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
<<<<<<< HEAD
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
=======
          <h4>{ first_name } { last_name }</h4>
          <table>
            <tbody>
              <tr>
                <td><b>Email:</b></td>
                <td>{ email }</td> 
              </tr>
              <tr>
                <td><b>Company:</b></td>
                <td>{ current_company }</td> 
              </tr>
              <tr>
                <td><b>Hire Date:</b></td>
                <td>{ hire_date.slice(0, 10) }</td> 
              </tr>
              <tr>
                <td><b>Needs:</b></td>
                <td>{ needs }</td> 
              </tr>
              <tr>
                <td><b>Goals:</b></td>
                <td>{ goals }</td> 
              </tr>
              <tr>
                <td><b>Questions:</b></td>
                {/* Add user questions here */}
              </tr>
            </tbody>
          </table>
>>>>>>> master
        </div>
      </div>
    )
  }
}


export default AdminUserView;