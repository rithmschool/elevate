import React, { Component } from "react";
import "./userDocsDataTable.css";
import { Table } from "react-bootstrap";

class UserDocsDataTable extends Component {
  renderUserDocsData() {
    let { documents } = this.props;
    return documents.map(doc => {
      const { id, title, counterparty, status, url, date_reviewed, date_submitted } = doc;
      return (
        <tr key={id}>
          <th style={{ width: "450px" }} scope="row">
            <a href={url}>{title}</a>
          </th>
          <td>{counterparty}</td>
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
