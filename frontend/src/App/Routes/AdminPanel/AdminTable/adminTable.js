import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Table } from "react-bootstrap";

import "./adminTable.css";

const mql = window.matchMedia(`(max-width: 640px)`);
// set the maximum number of table colums for smaller and larger screens
const maxColumCount = mql.matches ? 5 : 12;

class AdminTable extends Component {
  handleClick = evt => {
    const id = evt.target.parentElement.id;
    this.props.history.push(`/admin/users/${id}`);
  };

  createTableHeader() {
    const keys = Object.keys(this.props.tableObjs[0]);

    return (
      <tr>
        {keys
          .map(key => {
            // Remove underscore from key name
            key = key.replace(/_/g, " ");

            return <th key={key}>{key}</th>;
          })
          .filter((key, idx) => idx < maxColumCount)}
      </tr>
    );
  }

  createTableBody() {
    const table = this.props.tableObjs.map(item => {
      const itemKeys = Object.keys(item);
      const itemValues = Object.values(item);
      return this.createTableRows(itemKeys, itemValues);
    });

    return table;
  }

  concantinateText(value) {
    // concatinate at 6 characters for small screen and 25 for large
    if (typeof value === "string") {
      if (mql.matches) {
        // small screen
        if (value.slice(0, 2) === "19" || value.slice(0, 2) === "20") {
          // only show year on small strings
          value = value.slice(0, 4);
        }
        if (value.length > 9) {
          value = value.slice(0, 6) + "...";
        }
      } else {
        // larger screen
        if (value.length > 30) {
          value = value.slice(0, 25) + "...";
        }
      }
    }

    return value;
  }

  createTableRows(keys, values) {
    return (
      <tr key={values[0]} onClick={this.handleClick} id={values[0]}>
        {values
          .map((value, index) => {
            value = this.concantinateText(value);

            return <td key={`${values[0]}-${keys[index]}`}>{value}</td>;
          })
          .filter((value, idx) => idx < maxColumCount)}
      </tr>
    );
  }

  render() {
    const tableType = this.props.tableObjs[0].hasOwnProperty("company")
      ? "users"
      : "questions";
    return (
      <div className="admin-table">
        <Table
          striped
          bordered
          hover
          size="sm"
          responsive
          id={tableType + "-table"}
        >
          <thead>{this.createTableHeader()}</thead>
          <tbody>{this.createTableBody()}</tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(AdminTable);
