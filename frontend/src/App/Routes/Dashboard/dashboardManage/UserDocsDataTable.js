import React, { Component } from "react";
import { Table } from "reactstrap";

class UserDocsDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDocuments: [
        {
          id: "1",
          document: "Tinkerbell's assistant",
          counterParty: "Wendy",
          status: "received",
          dateReviewed: "-"
        },
        {
          id: "2",
          document: "Capain Hook's assistant",
          counterParty: "Peter",
          status: "pending",
          dateReviewed: "-"
        },
        {
          id: "3",
          document: "Peter Pan's assistant",
          counterParty: "John",
          status: "completed",
          dateReviewed: "01/01/2020"
        }
      ]
    };
  }

  renderUserDocsData() {
    return this.state.userDocuments.map(doc => {
      const { id, document, counterParty, status, dateReviewed } = doc;
      return (
        <tr key={id}>
          <th scope="row">{document}</th>
          <td>{counterParty}</td>
          <td>{status}</td>
          <td>{dateReviewed}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <h1>My Documents</h1>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Document</th>
              <th>Counterparty</th>
              <th>Status</th>
              <th>Date Reviewed</th>
            </tr>
          </thead>
          <tbody>{this.renderUserDocsData()}</tbody>
        </Table>
      </div>
    );
  }
}

export default UserDocsDataTable;
