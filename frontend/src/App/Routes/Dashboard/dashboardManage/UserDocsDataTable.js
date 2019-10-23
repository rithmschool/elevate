import React, { Component } from "react";
import { Table } from "reactstrap";

class UserDocsDataTable extends Component {
  renderUserDocsData() {
    let { documents } = this.props;
    return documents.map(doc => {
      const { id, title, counterparty, status, date_reviewed, date_submitted } = doc;
      return (
        <tr key={id}>
          <th scope="row">{title}</th>
          <td>{counterparty}</td>
          <td>{status}</td>
          <td>{date_submitted}</td>
          <td>{date_reviewed}</td>
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
              <th>Date Submitted</th>
              <th>Date Reviewed</th>
            </tr>
          </thead>
          {<tbody>{this.renderUserDocsData()}</tbody>}
        </Table>
      </div>
    );
  }
}

export default UserDocsDataTable;
