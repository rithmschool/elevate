import React, { Component } from "react";
import { Table } from "reactstrap";

class UserDocsDataTable extends Component {
  renderUserDocsData() {
    let { documents } = this.props;
    return documents.map(doc => {
      const { id, title, counterparty, status, url, date_reviewed, date_submitted } = doc;
      return (
        <tr key={id}>
          <th style={{"width":"450px"}} scope="row"><a href={"http://" + url}>{title}</a></th>
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
      <div className="Documents_table container-fluid">
        <h1>My Documents</h1>
        <Table hover bordered>
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
