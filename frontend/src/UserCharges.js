import React, { Component } from "react";
import ElevateApi from './ElevateApi';
import { Table } from 'react-bootstrap';
import AdminPanelCharges from './AdminPanelCharges';
import UserCharge from './UserCharge';
class UserCharges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      charges: []
    }
    // this.handleClick = this.handleClick.bind(this);
  }
  //Get all charges on first render
  async componentDidMount() {

    let { charges } = await ElevateApi.getCharges(this.props.userId);
    
    this.setState({ charges: charges }, () => {
    });
  }

  render() {
    let charges;
    if (this.state.charges === 'No outstanding charges') {
     return(
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
          
        />);

      return (
        <div>
          <h1>Payments Due:</h1>
          <Table striped bordered hover size="sm" responsive id="users-table">
              <thead>
                <tr>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
              </thead>
              {charges}
            </Table>
        </div>
      )
    }
  }
}
export default UserCharges;